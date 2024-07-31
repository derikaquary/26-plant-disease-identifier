"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

function Page() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const videoRef = useRef(null);

  const handleCapture = async () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBlob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg');
    });

    const imageObjectUrl = URL.createObjectURL(imageBlob);
    setCapturedImage(imageObjectUrl);

    const formData = new FormData();
    formData.append('image', imageBlob, 'image.jpeg');

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPlantInfo(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    const startVideo = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = mediaStream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startVideo();
  }, []);

  return (
    <div className="flex flex-col w-full bg-green-400 gap-5 items-center justify-center mx-auto">
      <div className="bg-red-400 h-[300px] w-full relative">
        {capturedImage ? (
          <Image src={capturedImage} alt="Captured Image" layout="fill" objectFit="cover" />
        ) : (
          <video ref={videoRef} autoPlay muted />
        )}
      </div>
      <div className="bg-blue-400 h-[300px] w-full">
        {plantInfo ? (
          <>
            <p>Plant name: {plantInfo.name}</p>
            <p>Issue: {plantInfo.issue}</p>
            <p>Solution: {plantInfo.solution}</p>
          </>
        ) : (
          <p>Waiting for analysis...</p>
        )}
      </div>
      <button className="bg-purple-400 h-[50px] w-[50px] rounded-full" onClick={handleCapture}>
        press
      </button>
    </div>
  );
}

export default Page;
