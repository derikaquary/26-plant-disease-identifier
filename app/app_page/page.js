"use client";

import { useState, useRef } from "react";
import { captureAndAnalyzeImage } from "../_lib/actions";

function Page() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user"); // Default to front camera

  async function handleCapture() {
    const video = videoRef.current;

    try {
      // Capture video stream
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

      try {
        const plantInfo = await captureAndAnalyzeImage(imageBlob);
        setPlantInfo(plantInfo);
      } catch (error) {
        console.error("Error analyzing image:", error);
        setError(error.message);
      }
    } catch (error) {
      console.error("Error capturing video stream:", error);
      setError(error.message);
    } finally {
      // Stop the video stream regardless of success or failure
      stream?.getTracks().forEach((track) => track.stop());
    }
  }

  async function handleCameraSwitch() {
    try {
      const newFacingMode = facingMode === "user" ? "environment" : "user";
      setFacingMode(newFacingMode);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode },
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error switching camera:", error);
      setError(error.message);
    }
  }

  function handleRetry() {
    // Reset component state
    setCapturedImage(null);
    setPlantInfo(null);
    setError(null);
  }

  return (
    <div className="flex flex-col w-full bg-green-400 gap-5 items-center justify-center mx-auto">
      <div className="bg-red-400 h-[300px] w-full relative">
        <video ref={videoRef} autoPlay muted />
        <button onClick={handleCameraSwitch}>Switch Camera</button>
      </div>
      <div className="bg-blue-400 h-[300px] w-full">
        {plantInfo ? (
          <>
            <p>Plant name: {plantInfo.name}</p>
            <p>Issue: {plantInfo.issue}</p>
            <p>Solution: {plantInfo.solution}</p>
          </>
        ) : error ? (
          <div>
            <p>Error: {error.message}</p>
            <button onClick={handleRetry}>Retry</button>
          </div>
        ) : (
          <p>Waiting for analysis...</p>
        )}
      </div>
      <button
        className="bg-purple-400 h-[50px] w-[100px] rounded-full"
        onClick={handleCapture}>
        Capture Image
      </button>
    </div>
  );
}

export default Page;
