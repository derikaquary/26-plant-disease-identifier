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

function PlantAnalyzer() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImageSize, setCapturedImageSize] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
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
      }); //open the user camera
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
      context.drawImage(video, 0, 0, canvas.width, canvas.height); //This line is the core of capturing the video frame as an image and put it to the canvas element

      const imageBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg"); //The canvas content is converted into an image Blob using canvas.toBlob()
      });

      setCapturedImage(URL.createObjectURL(imageBlob));
      setCapturedImageSize({ width: canvas.width, height: canvas.height });

      const imageBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(imageBlob);
      }); //captured image as an imageBlob is converted to a data URL and base64 encoded for sending to the API.

      const contents = [
        {
          role: "user",
          parts: [
            { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
            {
              text: "Analyze this plant and provide its name, potential issues, and solutions. At the end, provide a tag saying: use the info with caution",
            }, //A user prompt describing what to analyze
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
        const result = await model.generateContentStream({ contents }); //The user prompt and image data are sent to the model

        let buffer = [];
        let md = new MarkdownIt();
        for await (let response of result.stream) {
          buffer.push(response.text());
          setPlantInfo(md.render(buffer.join("")));
        }
      } catch (apiError) {
        console.error("Error analyzing image:", apiError);
        setError(`API Error: ${apiError.message}`);
      }
    } catch (error) {
      console.error("Error capturing video stream:", error);
      setError(`Capture Error: ${error.message}`);
    } finally {
      closeCamera();
    }
  }

  async function handleRetake() {
    setCapturedImage(null);
    setCapturedImageSize(null);
    setPlantInfo(null);
    setError(null);

    setTimeout(() => {
      openCamera();
    }, 100);
  }

  return (
    <div className="flex flex-col w-full bg-green-400 gap-3 items-center justify-center mx-auto">
      <div
        className="bg-red-400 h-[300px] w-full relative flex flex-col items-center justify-center"
        onClick={openCamera}>
        {capturedImage ? (
          <Image
            src={capturedImage}
            alt="Captured plant"
            width={capturedImageSize?.width || 300}
            height={capturedImageSize?.height || 300}
          />
        ) : (
          <video ref={videoRef} autoPlay muted />
        )}

        {error && <p>Error: {error}</p>}
      </div>
      {stream && (
        <button
          className="bg-black text-white py-2 px-4 rounded mb-3"
          onClick={closeCamera}
          disabled={!stream}>
          Close Camera
        </button>
      )}
      {!stream && (
        <button
          className="bg-black text-white py-2 px-4 rounded mb-3"
          onClick={openCamera}>
          Open Camera
        </button>
      )}
      <div className="bg-blue-400 h-[270px] w-full">
        {plantInfo ? (
          <div dangerouslySetInnerHTML={{ __html: plantInfo }} />
        ) : (
          <p>Waiting for analysis...</p>
        )}
      </div>
      <button
        className="bg-yellow-400 py-2 px-4 rounded mb-3"
        onClick={handleRetake}
        disabled={!capturedImage}>
        Take Another Picture
      </button>
      <button
        className="bg-purple-600 text-white py-2 px-4 rounded mb-3"
        onClick={handleCapture}
        disabled={!stream}>
        Click Here to Capture Image
      </button>
    </div>
  );
}

export default PlantAnalyzer;
