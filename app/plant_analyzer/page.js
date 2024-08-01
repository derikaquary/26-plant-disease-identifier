"use client";
// components/PlantAnalyzer.js

import { useState, useRef } from "react";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import Base64 from "base64-js";
import MarkdownIt from "markdown-it";
import Image from "next/image";

const API_KEY = process.env.GEMINI_API_KEY; // Replace with your Gemini API key

function PlantAnalyzer() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");

  const handleCapture = async () => {
    const video = videoRef.current;

    try {
      // Capture video stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      video.srcObject = stream;
      await video.play();

      // Wait for one frame to stabilize
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create a canvas to capture the frame
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to image blob
      const imageBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg");
      });

      // Convert the image blob to a base64 string
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = async () => {
        const base64data = reader.result;
        setCapturedImage(base64data);

        // Automatically submit the image for analysis
        await handleSubmit(base64data);
      };
    } catch (error) {
      console.error("Error capturing video stream:", error);
      setError(error.message);
    } finally {
      // Stop the video stream
      stream?.getTracks().forEach((track) => track.stop());
    }
  };

  const handleSubmit = async (imageBase64) => {
    setIsLoading(true);
    setOutput("");
    setError(null);

    try {
      const imageByteArray = Base64.toByteArray(imageBase64.split(",")[1]);
      const contents = [
        {
          role: "user",
          parts: [
            { inline_data: { mime_type: "image/jpeg", data: imageByteArray } },
            {
              text: "Analyze this plant for its name, condition, and any possible issues.",
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

      const result = await model.generateContentStream({ contents });

      let buffer = [];
      let md = new MarkdownIt();
      for await (let response of result.stream) {
        buffer.push(response.text());
        setOutput(md.render(buffer.join("")));
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCameraSwitch = async () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);
  };

  return (
    <div className="flex flex-col w-full bg-green-400 gap-5 items-center justify-center mx-auto">
      <div className="bg-red-400 h-[300px] w-full relative flex items-center justify-center">
        {capturedImage ? (
          <>
            <Image
              src={capturedImage}
              alt="Captured"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
                <div className="spinner"></div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
                <p>Error: {error}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
            />
            <button
              onClick={handleCapture}
              className="absolute bg-purple-400 p-2 rounded">
              Click Here
            </button>
          </>
        )}
        <button
          onClick={handleCameraSwitch}
          className="absolute bottom-0 left-0 m-2 bg-blue-400 p-2 rounded">
          Switch Camera
        </button>
      </div>
      <div className="bg-blue-400 h-[300px] w-full p-4">
        {output ? (
          <div dangerouslySetInnerHTML={{ __html: output }} />
        ) : (
          <p>{isLoading ? "Analyzing..." : "Waiting for analysis..."}</p>
        )}
      </div>
    </div>
  );
}

export default PlantAnalyzer;
