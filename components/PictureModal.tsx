"use client"


import { Id } from '@/convex/_generated/dataModel';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { useToast } from './ui/use-toast';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface PictureModalProps {
    setImage: Dispatch<SetStateAction<string>>;
    setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
    image: string;
}

const PictureModal = ({ setImage, setImageStorageId, image }: PictureModalProps) => {

    const imageRef = useRef<HTMLInputElement>(null);
    const [ImageLoading, setImageLoading] = useState(false);
    const uploadUrl = useMutation(api.files.generateUploadUrl)
    const { startUpload } = useUploadFiles(uploadUrl);
    const getImageUrl = useMutation(api.student.getUrl)

    const { toast } = useToast();

    const handleImage = async (blob: Blob, fileName: string) => {
        setImageLoading(true);
        setImage('');

        try {

            const file = new File([blob], fileName, { type: 'Image/png' })
            const uploaded = await startUpload([file])
            const storageId = (uploaded[0].response as any).storageId;

            setImageStorageId(storageId);
            const imageUrl = await getImageUrl({ storageId });
            setImage(imageUrl!);
            setImageLoading(false);
            toast({ title: 'Thumbnail uploaded successfully' })

        } catch (error) {
            console.log(error)
            toast({ title: 'Error', variant: 'destructive' })
        }

    }


    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const files = e.target.files;
            if (!files) return;
            const file = files[0];
            const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));
            handleImage(blob, file.name)
        } catch (error) {
            console.log(error);
            toast({ title: 'Error Uplaoding image', variant: 'destructive' })
        }
    }


    return (
        <>
            <Label className="font-bold text-white mt-2">Picture</Label>

            <div onClick={() => imageRef?.current?.click()} className='image_div'>
                <Input type='file' className='hidden' ref={imageRef} onChange={(e) => uploadImage(e)} />
                {!ImageLoading ? (
                    <Image src='/icons/upload-image.svg' width={40} height={40} alt='upload' />
                ) : (
                    <div className='flex-center font-medium text-white'>
                        Uploading
                        <Loader size={20} className='animate-spin ml-3' />
                    </div>
                )}
                <div className='flex flex-col items-center gap-1'>
                    <h2 className='text-[12px] font-bold text-orange-1'>Click to upload</h2>
                    <p className='text-[12px] font-normal text-gray-1'>PNG, JPG or JPEG</p>
                </div>
            </div>

            {image && (
                <div className='flex-center w-full'>
                    <Image src={image} width={200} height={200} className='mt-5' alt='thumbnail' />
                </div>
            )}
        </>
    )
}

export default PictureModal