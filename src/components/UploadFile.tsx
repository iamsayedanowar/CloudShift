// Modules

import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from '@imagekit/react';
import { useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'sonner';
import { functions } from '@/lib/appwrite';
import { useFolder } from '@/contexts/FolderContext';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { UploadIcon } from 'lucide-react';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UploadFile = ({ open, onOpenChange }: Props) => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortController = new AbortController();
    const location = useLocation();
    const currentFolderName = useFolder();
    const getAuthData = useCallback(async () => {
        try {
            const response = await functions.createExecution({
                functionId: import.meta.env.VITE_APPWRITE_FN_ID,
                xpath: '/auth',
            });
            if (response.responseStatusCode !== 200) {
                throw new Error(`Failed to get auth data: ${response.status} ${response.errors}`);
            }
            const data = JSON.parse(response.responseBody);
            return data;
        } catch (err) {
            console.log(err);
            throw new Error("Authentication failed");
        }
    }, []);
    const handleUpload = useCallback(async () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) return toast.error("Please select a file to upload");
        const pathname = location.pathname;
        const folderPath = location.pathname.startsWith('/drive/folders/') ? pathname.split('/folders/')[1] : null;
        try {
            setIsUploading(true);
            const { signature, expire, token, publicKey } = await getAuthData();
            await upload({
                file,
                fileName: file.name,
                folder: folderPath ? `/${currentFolderName}/${folderPath}` : `/${currentFolderName}`,
                expire,
                token,
                signature,
                publicKey,
                onProgress: (event) => {
                    setProgress(Math.round((event.loaded / event.total) * 100));
                },
                abortSignal: abortController.signal,
            });
            toast.success("File uploaded successfully");
            if (fileInputRef.current) fileInputRef.current.value = "";
            setProgress(0);
            onOpenChange(false);
        } catch (err) {
            if (err instanceof ImageKitAbortError) {
                toast.warning(`Upload aborted: ${err?.message}`);
            } else if (err instanceof ImageKitInvalidRequestError) {
                toast.error(`Invalid request: ${err?.message}`);
            } else if (err instanceof ImageKitUploadNetworkError) {
                toast.error(`Network error: ${err?.message}`);
            } else if (err instanceof ImageKitServerError) {
                toast.error(`Server error: ${err?.message}`);
            } else {
                toast.error("Upload failed");
            }
        } finally {
            setIsUploading(false);
        }
    }, [location.pathname, abortController.signal, currentFolderName, getAuthData, onOpenChange]);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2'>
                        <UploadIcon />
                        Upload File
                    </DialogTitle>
                </DialogHeader>
                <Input type='file' ref={fileInputRef} className='cursor-pointer mt-4' disabled={isUploading} />
                {progress > 0 && (
                    <div className='space-y-1'>
                        <div className='flex justify-between text-sm text-muted-foreground'>
                            Uploading...
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className='h-2 rounded-full transition-all duration-300' />
                    </div>
                )}
                <DialogFooter className='flex flex-col gap-2'>
                    {!isUploading ? (
                        <Button onClick={handleUpload} className='w-full flex items-center justify-center gap-2 cursor-pointer'>
                            Upload File
                        </Button>
                    ) : (
                        <Button variant='secondary' size='sm' className='w-full flex items-center justify-center gap-2 cursor-pointer' onClick={() => { }}>
                            Cancel Upload
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};