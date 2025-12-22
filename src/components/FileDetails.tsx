// Modules

import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FileInfo } from "@/components/FileInfo";
import { FilePreview } from "@/components/FilePreview";
import { ImgPreviewSidebar } from "@/components/ImgPreviewSidebar";
import type { FileDetailsType } from "@/types/all-types";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export const FileDetails = ({ open, onOpenChange, file }: FileDetailsType) => {
    const isVideo = file.mime.startsWith('video/');
    const isImage = file.mime.startsWith('image/');
    const thumbnail = isImage ? file.url : file.thumbnail;
    const [loading, setLoading] = useState(false);
    const [selectedTransforms, setSelectedTransforms] = useState<string[]>([]);
    const [prompts, setPrompts] = useState<{ [key: string]: string; }>({});
    const transformQuery = selectedTransforms.length > 0 ? `tr=${selectedTransforms.join(":")}` : "";
    const handleToggle = useCallback((id: string, promptText?: string) => {
        setLoading(true);
        const transformId = promptText ? `${id}-prompt-${promptText.trim().replace(/\s+/g, '_')}` : id;
        setSelectedTransforms((prev) => prev.includes(transformId) ? prev.filter((item) => item !== transformId) : [...prev, transformId]);
        if (promptText) {
            setPrompts((prev) => ({ ...prev, [id]: '' }));
        }
    }, []);
    const handlePromptChange = useCallback((id: string, value: string) => {
        setPrompts((prev) => ({ ...prev, [id]: value }));
    }, []);
    const handleDownload = async () => {
        try {
            let finalUrl = file.url;
            if (selectedTransforms.length > 0) {
                const separator = finalUrl.includes('?') ? '&' : '?';
                finalUrl = `${finalUrl}${separator}tr=${selectedTransforms.join(":")}`;
            }
            console.log("Downloading from:", finalUrl); // Debug log
            const response = await fetch(finalUrl);
            if (!response.ok) throw new Error("Network response was not ok");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const extension = file.name.split('.').pop();
            const baseName = file.name.replace(`.${extension}`, '');
            const suffix = selectedTransforms.length > 0 ? '-edited' : '';
            a.download = `${baseName}${suffix}.${extension}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Download failed:", error);
            let finalUrl = file.url;
            if (selectedTransforms.length > 0) {
                const separator = finalUrl.includes('?') ? '&' : '?';
                finalUrl = `${finalUrl}${separator}tr=${selectedTransforms.join(":")}`;
            }
            window.open(finalUrl, '_blank');
        }
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full h-full sm:h-[90%] max-w-none rounded-none sm:rounded-lg sm:max-w-6xl overflow-auto no-scrollbar">
                <DialogHeader className="border-b pb-2">
                    <DialogTitle>
                        File Details
                    </DialogTitle>
                    <DialogDescription>
                        Details about the file
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col md:flex-row gap-4 md:gap-0">
                    <div className="flex flex-1 items-center justify-center">
                        <FilePreview file={file} isVideo={isVideo} isImage={isImage} thumbnail={thumbnail} loading={loading} setLoading={setLoading} transformQuery={transformQuery} />
                    </div>
                    <div className="w-full md:w-100 bg-background flex flex-col md:p-4">
                        {isImage ? (
                            <ImgPreviewSidebar file={file} selectedTransforms={selectedTransforms} prompts={prompts} handleToggle={handleToggle} handlePromptChange={handlePromptChange} />
                        ) : (
                            <div className="border rounded-lg p-5 bg-muted/40 mb-6">
                                <h3 className="font-semibold text-foreground mb-2">
                                    File Information
                                </h3>
                                <Separator className="mt-2 mb-4" />
                                <FileInfo file={file} />
                            </div>
                        )}
                        <Button onClick={handleDownload} variant="default" className="w-full cursor-pointer mt-4 md:mt-0">
                            <DownloadIcon />
                            Download {selectedTransforms.length > 0 ? "Edited" : "Original"}
                        </Button>
                    </div>
                </div>
                <DialogFooter className="border-t pt-2">
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};