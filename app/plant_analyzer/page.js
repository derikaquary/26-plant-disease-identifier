"use client";

import { useState, useRef, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import Base64 from "base64-js";
import MarkdownIt from "markdown-it";
import Image from "next/image";

const PlantAnalyzer = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImageSize, setCapturedImageSize] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const API_KEY = "AIzaSyDg_owD1CxZqN__Q_GxetUf4KnzuhlYfgw";

  const handleCapture = async () => {
    const video = videoRef.current;
    let stream;

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      video.srcObject = stream;
      await video.play();

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
              text: "Analyze this plant and provide its name, potential issues, and solutions.",
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
        const result = await model.generateContentStream({ contents });

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
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  return (
    <div className="flex flex-col w-full bg-green-400 gap-5 items-center justify-center mx-auto">
      <div
        className="bg-red-400 h-[300px] w-full relative"
        onClick={handleCapture}>
        <video ref={videoRef} autoPlay muted />
        {capturedImage && (
          <Image
            src={capturedImage}
            alt="Captured plant"
            width={capturedImageSize?.width || 300}
            height={capturedImageSize?.height || 300}
          />
        )}
        {error && <p>Error: {error}</p>}
      </div>
      <div className="bg-blue-400 h-[300px] w-full">
        {plantInfo ? (
          <div dangerouslySetInnerHTML={{ __html: plantInfo }} />
        ) : (
          <p>Waiting for analysis...</p>
        )}
      </div>
    </div>
  );
};

export default PlantAnalyzer;
