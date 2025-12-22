// Modules

import { formatFileSize } from "@/lib/fileSize";
import { formatDate } from "@/lib/formatDate";
import type { File } from "@/types/all-types";

const truncate26 = (value: string) => value.length > 26 ? value.slice(0, 26) + "..." : value;

export const FileInfo = ({ file }: { file: File; }) => {
    const fileType = file.mime.split("/")[1];
    return (
        <div className="space-y-2 text-sm">
            <p title={file.name}>
                <strong>Name:</strong> {truncate26(file.name)}
            </p>
            <p title={fileType}>
                <strong>Type:</strong> {truncate26(fileType)}
            </p>
            <p>
                <strong>Size:</strong> {formatFileSize(file.size)}
            </p>
            <p>
                <strong>Created At:</strong> {formatDate(file.createdAt)}
            </p>
            <p>
                <strong>Updated At:</strong> {formatDate(file.updatedAt)}
            </p>
        </div>
    );
};