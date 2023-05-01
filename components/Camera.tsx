"use client";

import { useEffect, useRef, useState } from "react";

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getMedia = async () => {
      console.log(navigator);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        // @ts-ignore
        setError(err);
      }
    };

    getMedia();

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      }
    };
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return <video ref={videoRef} autoPlay playsInline muted />;
};

export default Webcam;
