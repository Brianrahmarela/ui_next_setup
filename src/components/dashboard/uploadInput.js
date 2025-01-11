"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "../ui/icons";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

const UploadInput = () => {
  const [txtErrFormat, setTxtErrFormat] = useState('');
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [file, setFile] = useState(null);
  const [isDownload, setIsDownload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imgUploaded, setImgUploaded] = useState('https://res.cloudinary.com/dzwtswt1r/image/upload/v1617597570/uczo8vyl8wyde8gbyge7.jpg');
  console.log('imgUploaded', imgUploaded)

  function CapitalFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const uploadFile = async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ro2dp9mv");
  
    const headers = {
      'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    if (file) {
      if(isDownload){
        const onUploadProgress = (event) => {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setLoadingPercent(percentComplete);
        };
  
        const upload = async () => {
          setIsLoading(true);
          try {
            console.log(file)
            const response = await uploadFile(file, onUploadProgress);
            console.log(response)  
            console.log('msk', response.secure_url)
            setIsDownload(false)
            setImgUploaded(response.secure_url)

            setFile(null)
            toast.success(CapitalFirstLetter(`${response.meta.message}`), {
              duration: 7000,
              description: ``,
              style: { fontSize: '14.4px', color: 'green', border: 'solid 1px green', strokeWidth: 10, display: 'flex', alignItems: 'start' },
              position: 'bottom-right', className: 'class',
              icon: <Icons.succesAlert strokeWidth={4} className='h-4 w-4 bg-green-700 text-white rounded-full p-[2px] mt-[5px]' />,
            })
          } catch (error) {
            setIsDownload(false)
            setFile(null)
            
            toast.error(`Error: terjadi kesalahan di server`, {
              duration: 7000,
              style: { fontSize: '14.4px', color: '#d72e21', border: 'solid 1px #d72e21', strokeWidth: 10 },
              position: 'bottom-right', className: 'class',
              icon: <div strokeWidth={5} className='flex items-center h-4 w-4 bg-[#d72e21] text-white rounded-full pl-[6px]'>!</div>,
            });
          } 
          finally {
            setLoadingPercent(100);
            setIsLoading(false);
          }
        };
        upload();
      }
    } 
  }, [file]);

  const handleFileExcelUpload = (e) => {
    if(e.target.files[0]){
        setTxtErrFormat('')
        setFile(e.target.value && e.target.files[0]);
        setUrlFailedUpload(null)
        setIsDownload(true)
    } else {
      setTxtErrFormat('')
      setUrlFailedUpload(null)
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5 mt-5">
      <div className={`${file && !isDownload ? "hidden" : 'block'}`}>
        <Label htmlFor="excel" className="mt-1 text-[14.5px] font-semibold">
          Upload
        </Label>
        <Input
          disabled={isLoading}
          id="excel"
          type="file"
          // accept=".xlsx"
          onChange={handleFileExcelUpload}
          className={`${txtErrFormat !== '' && "border-rose-500"} hover:bg-[#f8fafc] mt-2`}
        />
      </div>
      {isLoading ? (
        <>
        <div className="flex items-center">
          <Progress value={loadingPercent} />
          <p className="text-[13.7px] font-medium ml-3">{loadingPercent}%</p>
        </div>
        <div>
          <p className="text-[13.7px] loading-dot">Uploading file, please wait</p>
        </div>
        </>
      ) : <Image
        priority
        alt={`image`}
        // alt={`image-${index}`}
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