"use client";
import { takePicture } from "@/libs/capacitor/helpers";

const Camera = () => {
  takePicture();
  return <h1>Hola mundo</h1>;
};

export default Camera;
