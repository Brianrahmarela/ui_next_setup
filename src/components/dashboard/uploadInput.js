"use client";
import React, { useState } from "react";
import axios from 'axios';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

const UploadInput = () => {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imgUploaded, setImgUploaded] = useState(null);

  const uploadFile = async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ro2dp9mv");

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzwtswt1r/image/upload`,
        formData, 
        { headers, onUploadProgress }
      );
      return response.data;
    } catch (error) {
      return error.response?.data;
    }
  };

  // Menghandle upload file yang dipilih
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);

      // On progress bar
      const onUploadProgress = (event) => {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setLoadingPercent(percentComplete);
      };

      try {
        const response = await uploadFile(file, onUploadProgress);
        setImgUploaded(response.secure_url); 
        toast.success("Image uploaded successfully", {
          position: "bottom-right",
          style: { fontSize: '14px', color: 'green' },
        });
      } catch (error) {
        toast.error("Failed to upload image", {
          position: "bottom-right",
          style: { fontSize: '14px', color: 'red' },
        });
      } finally {
        setIsLoading(false);
        setLoadingPercent(100);
      }
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5 mt-5">
      <div>
        <Label htmlFor="image-upload" className="mt-1 text-[14.5px] font-semibold">
          Upload Image
        </Label>
        <Input
          disabled={isLoading}
          id="image-upload"
          type="file"
          onChange={handleFileUpload}
          className="mt-2"
        />
      </div>

      {isLoading ? (
        <>
          <div className="flex items-center">
            <Progress value={loadingPercent} />
            <p className="text-[13.7px] font-medium ml-3">{loadingPercent}%</p>
          </div>
          <p className="text-[13.7px] loading-dot">Uploading image, please wait...</p>
        </>
      ) : imgUploaded && 
        <Image
          priority
          alt="Uploaded Image"
          src={imgUploaded}
          width={300}
          height={410}
          className="rounded-md transition duration-300 ease-in-out hover:opacity-80"
          
        />
     }
    </div>
  );
};

export default UploadInput;
