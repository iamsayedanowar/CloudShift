// Modules

import { useState, useMemo, useCallback } from "react";
import { Image } from "@imagekit/react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileMenu } from "@/components/FileMenu";
import { FileDetails } from "@/components/FileDetails";
import { formatCustomDate } from "@/lib/utils";
// import { fileIcons } from "@/assets/icons/file";
import type { File } from "@/types/all-types";
import { ImageIcon, FilmIcon, MusicIcon, FileArchiveIcon, FileTextIcon, BracesIcon, FileIcon } from "lucide-react";

export const FileCard = ({ file }: { file: File; }) => {
    const [detailOpen, setDetailOpen] = useState(false);
    const thumbnail = useMemo(() => file?.mime.startsWith('image/') ? file.url : file.thumbnail, [file]);
    const getFileIcon = useCallback((mime: string) => {
        if (!mime) return FileIcon;
        if (mime.startsWith('image/')) return ImageIcon;
        if (mime.startsWith('video/')) return FilmIcon;
        if (mime.startsWith('audio/')) return MusicIcon;
        if (mime === 'application/zip' || mime === 'application/x-7z-compressed' || mime === 'application/x-rar-compressed' || mime === 'application/x-tar' || mime === 'application/gzip') return FileArchiveIcon;
        if (mime === 'application/pdf' || mime === 'text/plain' || mime === 'application/msword' || mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return FileTextIcon;
        if (mime === 'application/json' || mime === 'application/xml' || mime === 'text/html' || mime === 'text/css' || mime === 'text/javascript') return BracesIcon;
        return FileIcon;
        // return fileIcons[mime] || FileIcon;
    }, []);
    const Icon = getFileIcon(file.mime);
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <span className="flex gap-2 items-center">
                            {Icon && <Icon />}
                            <span>
                                {file.name.slice(0, 16)}
                                {file.name.length > 18 ? "..." : ""}
                            </span>
                        </span>
                        <FileMenu file={file} />
                    </CardTitle>
                </CardHeader>
                <CardContent className="grow cursor-pointer" onClick={() => setDetailOpen(true)}>
                    <Image urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT} src={thumbnail} width={500} height={500} alt={file.name} loading="lazy" className="w-full h-full object-cover rounded-lg" />
                </CardContent>
                <CardFooter>
                    <p>
                        Last Modified: {file.updatedAt ? formatCustomDate(file.updatedAt) : "N/A"}
                    </p>
                </CardFooter>
            </Card>
            <FileDetails open={detailOpen} onOpenChange={setDetailOpen} file={file} />
        </>
    );
};