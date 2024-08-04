"use client";

import { useState, useRef } from "react";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import Base64 from "base64-js";
import MarkdownIt from "markdown-it";
import Image from "next/image";
import { CiCamera } from "react-icons/ci";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { FiCameraOff } from "react-icons/fi";
import { IoRefreshCircleOutline } from "react-icons/io5";
import Spinner from "../_components/Spinner";
import Navigation from "../_components/Navigation";

function PlantAnalyzer() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImageSize, setCapturedImageSize] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  async function openCamera() {
    const video = videoRef.current;
    if (!video) {
      setError("Camera element not found. Please try again.");
      return;
    }

    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      video.srcObject = localStream;
      await video.play();
      setStream(localStream);
    } catch (error) {
      console.error("Error accessing video stream:", error);
      setError(`Access Error: ${error.message}`);
    }
  }

  async function closeCamera() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      videoRef.current.src = "";
    }
  }

  async function handleCapture() {
    const video = videoRef.current;

    if (!video) {
      setError("Video element not found. Please try again.");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

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

      const contents = [
        {
          role: "user",
          parts: [
            { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
            {
              text: "Analyze this plant and provide its name, potential issues, and solutions. The solution must be precise, if there is a lack of nutritions, the nutritions must be mentioned, which mineral is lacking. Be spesific, do not try to say it is not possible to determine, just give your best guest. Do not ask back to the user, this is a one way app. At the end, provide a tag saying: use the info with caution",
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
    } catch (error) {
      console.error("Error capturing video stream:", error);
      setError(`Capture Error: ${error.message}`);
    } finally {
      if (videoRef.current && stream) {
        closeCamera();
      }
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

  return (
    <div className="absolute bottom-[25px] left-[25px] right-[25px] top-[25px] rounded-2xl border-r-2 border-t-2 border-white/40 bg-white/20 shadow-2xl flex flex-col gap-3 justify-center items-center">
      <div
        className="rounded-xl h-[170px] w-full relative flex flex-col items-center mt-2"
        onClick={openCamera}>
        {capturedImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={capturedImage}
            alt="Captured plant"
            className="rounded-xl h-[150px] w-[260px] object-cover"
          />
        ) : (
          <video
            className={`${
              !stream ? "hidden" : " "
            } rounded-xl h-[150px] w-[260px] object-cover`}
            ref={videoRef}
            autoPlay
            muted
            style={{ objectFit: "cover" }}
          />
        )}

        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      </div>
      {stream && (
        <button
          className="border-[4px] border-white rounded-full px-2 py-2"
          onClick={closeCamera}
          disabled={!stream && capturedImage}>
          <FiCameraOff color="white" size={30} />
        </button>
      )}
      {!stream && (
        <button
          className="border-[4px] border-white rounded-full px-2 py-2"
          onClick={openCamera}>
          <CiCamera color="white" size={30} />
        </button>
      )}
      <div className="h-[250px] bg-black/10 backdrop-blur-xl w-full flex flex-col items-center justify-center shadow-md px-3">
        {loading ? (
          <Spinner />
        ) : plantInfo ? (
          <div
            className="text-[20px] text-white w-full overflow-auto px-2"
            dangerouslySetInnerHTML={{ __html: plantInfo }}
          />
        ) : (
          <p className="text-[20px] text-white ">
            Tap the camera icon above to open the camera, if error tap refresh.
            Then start identify your plant disease...
          </p>
        )}
        {error && (
          <p className="text-red-500 mt-2">
            Unable to generate response: {error}
          </p>
        )}
      </div>
      <button onClick={handleRetake} disabled={!capturedImage}>
        <IoRefreshCircleOutline size={60} color="white" />
      </button>
      <button onClick={handleCapture} disabled={!stream}>
        <IoRadioButtonOnOutline color="white" size={80} />
      </button>
      <Navigation />
    </div>
  );
}

export default PlantAnalyzer;
