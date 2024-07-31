"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { captureAndAnalyzeImage } from "../_lib/actions";

function Page() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  async function handleCapture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBlob = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/jpeg");
    });

    try {
      setIsLoading(true);
      const plantInfo = await captureAndAnalyzeImage(imageBlob);
      setPlantInfo(plantInfo);
      setIsLoading(false);
    } catch (error) {
      console.error("Error capturing and analyzing image:", error);
      setError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full bg-green-400 gap-5 items-center justify-center mx-auto">
      <div className="bg-red-400 h-[300px] w-full relative">
        {isLoading ? (
          <div>Loading...</div> // Replace with a proper loading indicator
        ) : (
          <>
            {capturedImage ? (
              <Image
                src={capturedImage}
                alt="Captured Image"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <video ref={videoRef} autoPlay muted />
            )}
          </>
        )}
      </div>
      <div className="bg-blue-400 h-[300px] w-full">
        {plantInfo ? (
          <>
            <p>Plant name: {plantInfo.name}</p>
            <p>Issue: {plantInfo.issue}</p>
            <p>Solution: {plantInfo.solution}</p>
          </>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>Waiting for analysis...</p>
        )}
      </div>
      <button
        className="bg-purple-400 h-[50px] w-[50px] rounded-full"
        onClick={handleCapture}>
        press
      </button>
    </div>
  );
}

export default Page;
