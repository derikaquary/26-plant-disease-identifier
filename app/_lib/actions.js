"use server";

import { getPlantInfo } from "./data-service";

export async function captureImageFromDevice() {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    const video = document.createElement("video");
    video.srcObject = mediaStream;
    video.play();

    // ... logic to capture image from video element ...
  } catch (error) {
    console.error("Error accessing camera:", error);
    throw error;
  }
}

export async function captureAndAnalyzeImage(imageData) {
  try {
    const plantInfo = await getPlantInfo(imageData);
    // Handle plant info, update state, etc.
    console.log(plantInfo);
    return plantInfo;
  } catch (error) {
    console.error("Error capturing and analyzing image:", error);
    throw error;
  }
}

