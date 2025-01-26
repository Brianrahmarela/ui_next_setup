import UploadInput from '@/components/dashboard/uploadInput'
import React from 'react'

const Upload = () => {
  return (
    <div>
      <div className="col-span-12 sm:col-span-6">
        <h2 className="text-xl font-semibold mb-[2px]">
          Upload Page
        </h2>
      </div>
      <UploadInput/>
    </div>
  )
}

export default Upload