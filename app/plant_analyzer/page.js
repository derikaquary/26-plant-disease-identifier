"use client";

import { useState, useRef } from "react";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import { CiCamera } from "react-icons/ci";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { FiCameraOff } from "react-icons/fi";
import { IoRefreshCircleOutline } from "react-icons/io5";
import { MdOutlineZoomInMap } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";
import Spinner from "../_components/Spinner";
import Navigation from "../_components/Navigation";

function PlantAnalyzer() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImageSize, setCapturedImageSize] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  async function openCamera() {
    const video = videoRef.current;
    if (!video) {
      setError("Please tap the reset button.");
      return;
    }
  
    // Clear the existing source
    video.srcObject = null;
  
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      video.srcObject = localStream;
      video.onloadedmetadata = async () => {
        try {
          await video.play();
          setStream(localStream);
        } catch (playError) {
          console.error("Error playing video stream:", playError);
          setError(`Play Error: ${playError.message}`);
        }
      };
    } catch (error) {
      console.error("Error accessing video stream:", error);
      setError(`Access Error: ${error.message}`);
    }
  }
  

  async function closeCamera() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null; // Ensure the video src is cleared
    }
  }

  async function handleCapture() {
    const video = videoRef.current;

    if (!video) {
      setError("Video element not found. Please tap the reset button.");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      const scaledWidth = video.videoWidth / zoom;
      const scaledHeight = video.videoHeight / zoom;
      const offsetX = (video.videoWidth - scaledWidth) / 2;
      const offsetY = (video.videoHeight - scaledHeight) / 2;

      context.drawImage(
        video,
        offsetX,
        offsetY,
        scaledWidth,
        scaledHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const imageBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg");
      });

      setCapturedImage(URL.createObjectURL(imageBlob));
      setCapturedImageSize({ width: canvas.width, height: canvas.height });

      const imageBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(imageBlob);
      });

      analyzeImage(imageBase64);
    } catch (error) {
      console.error("Error capturing video stream:", error);
      setError(`Capture Error: ${error.message}`);
    } finally {
      closeCamera(); // Ensure the camera is closed after capture
    }
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageBase64 = reader.result.split(",")[1];
        setCapturedImage(reader.result);
        analyzeImage(imageBase64);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(`Upload Error: ${error.message}`);
    }
  }

  async function analyzeImage(imageBase64) {
    const contents = [
      {
        role: "user",
        parts: [
          { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
          {
            text: "Analyze this plant and provide its name, potential issues, and solutions. The solution must be precise, if there is a lack of nutritions, the nutritions must be mentioned, which mineral is lacking. Be specific, do not try to say it is not possible to determine, just give your best guess. Do not ask back to the user, this is a one way app. At the end, provide a tag saying: use the info with caution",
          },
        ],
      },
    ];

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    try {
      setLoading(true);
      const result = await model.generateContentStream({ contents });

      let buffer = [];
      let md = new MarkdownIt();
      for await (let response of result.stream) {
        buffer.push(response.text());
        setPlantInfo(md.render(buffer.join("")));
      }
    } catch (apiError) {
      console.error("Error analyzing image:", apiError);
      setPlantInfo(
        `<p class="text-red-500">Something went wrong. Please tap the reset button and try again.</p>`
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRetake() {
    setCapturedImage(null);
    setCapturedImageSize(null);
    setPlantInfo(null);
    setError(null);

    // Add a delay before opening the camera again
    await new Promise((resolve) => setTimeout(resolve, 100));
    openCamera();
  }

  const handleZoomChange = (event) => {
    setZoom(event.target.value);
  };

  return (
    <div className="absolute bottom-[25px] left-[25px] right-[25px] top-[25px] rounded-2xl border-r-2 border-t-2 border-white/40 bg-white/20 shadow-2xl flex flex-col gap-3 justify-center items-center">
      <div className="relative w-[320px] h-[180px] overflow-hidden rounded-xl mt-2">
        {capturedImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={capturedImage}
            alt="Captured plant"
            className="rounded-xl h-full w-full object-cover"
          />
        ) : (
          <video
            className={`${
              stream ? " " : "hidden"
            } rounded-xl h-full w-full object-cover`}
            ref={videoRef}
            autoPlay
            muted
            style={{ transform: `scale(${zoom})` }}
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          className="border-[4px] border-white rounded-full px-2 py-2"
          onClick={() => fileInputRef.current.click()}>
          <MdOutlineFileUpload color="white" size={30} />
        </button>
        {!stream && (
          <button
            className="border-[4px] border-white rounded-full px-2 py-2"
            onClick={openCamera}>
            <CiCamera color="white" size={30} />
          </button>
        )}
        {stream && (
          <div className="flex items-center gap-2">
            <label htmlFor="zoom" className="text-white font-semibold">
              <MdOutlineZoomInMap color="white" size={30} />
            </label>
            <input
              id="zoom"
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={handleZoomChange}
              className="w-24"
            />
            <button
              className="border-[4px] border-white rounded-full px-2 py-2 ml-2"
              onClick={closeCamera}
              disabled={!stream && capturedImage}>
              <FiCameraOff color="white" size={30} />
            </button>
          </div>
        )}
      </div>
      <div className="h-[250px] bg-black/10 backdrop-blur-xl w-full flex flex-col items-center justify-center shadow-md px-3">
        {loading ? (
          <Spinner />
        ) : plantInfo ? (
          <div
            className="text-[20px] text-white w-full overflow-auto px-2"
            dangerouslySetInnerHTML={{ __html: plantInfo }}
          />
        ) : (
          <p className="text-[20px] text-white">
            Please tap the camera icon or upload your own plant photo. Tap
            refresh button to take another image
          </p>
        )}
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      </div>

      <div className="flex items-center gap-2">
        {capturedImage && (
          <button onClick={handleRetake}>
            <IoRefreshCircleOutline color="white" size={70} />
          </button>
        )}
        {stream && (
          <button onClick={handleCapture} disabled={loading}>
            <IoRadioButtonOnOutline color="white" size={70} />
          </button>
        )}
      </div>
      <Navigation />
    </div>
  );
}

export default PlantAnalyzer;
