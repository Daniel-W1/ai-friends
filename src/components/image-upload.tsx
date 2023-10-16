'use client'

import { useEffect, useState } from "react"
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const ImageUpload = ({
  value, onChange, disabled = false
}: ImageUploadProps) => {

  // to do understand this
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="w-full flex justify-center">
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        uploadPreset="wlqpznhr"
        onUpload={(result: any)=> onChange(result.info.secure_url)}
      >
        <div className="p-4 border-2 border-dashed border-primary/20 ">
          <Image
            src={value || '/placeholder.svg'}
            alt="Companion Image"
            width={200}
            height={200}
          />  
        </div>
      </CldUploadButton>
    </div>
  )
}

export default ImageUpload