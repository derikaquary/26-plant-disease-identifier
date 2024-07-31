"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ErrorBoundary from "../error";
import Error from "../error";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { captureAndAnalyzeImage } from "../_lib/actions";

function Page() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user"); // Default to front camera
  const [crop, setCrop] = useState(null);

  async function handleCapture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    try {
      // try is for image capture logic
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      await video.play();

      // Wait for one frame to stabilize
      await new Promise((resolve) => setTimeout(resolve, 500));

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg");
      });

      setIsLoading(true);
      const plantInfo = await captureAndAnalyzeImage(imageBlob);
      setPlantInfo(plantInfo);
      setIsLoading(false);

      // Stop the video stream
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error capturing and analyzing image:", error);
      setError(error.message);
      setIsLoading(false);
    }
  }

  function handleCameraSwitch() {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  }

  function handleRetry() {
    // Reset component state
    setCapturedImage(null);
    setPlantInfo(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <ErrorBoundary fallback={<Error reset={handleRetry} />}>
      <div className="flex flex-col w-full bg-green-400 gap-5 items-center justify-center mx-auto">
        <div className="bg-red-400 h-[300px] w-full relative">
          {capturedImage ? (
            <ReactCrop
              src={capturedImage}
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
            />
          ) : (
            <video ref={videoRef} autoPlay muted />
          )}
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
    </ErrorBoundary>
  );
}

export default Page;
