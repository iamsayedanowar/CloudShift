// Modules

import { useState } from "react";
import { downloadFile, copyToClipboard } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuTrigger, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { RenameFile } from "@/components/RenameFile";
import { FileInformation } from "@/components/FileInformation";
import { DeleteFile } from "@/components/DeleteFile";
import { FileDetails } from "@/components/FileDetails";
import { CopyIcon, DownloadIcon, EditIcon, EllipsisVerticalIcon, FolderOpenIcon, InfoIcon, ShareIcon, Trash2Icon } from "lucide-react";
import type { File } from "@/types/all-types";

export const FileMenu = ({ file }: { file: File; }) => {
    const [renameOpen, setRenameOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVerticalIcon className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px]">
                    <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => setDetailsOpen(true)}>
                        <FolderOpenIcon size={18} className="text-gray-400" />
                        Open File
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => downloadFile(file.url, file.name)}>
                        <DownloadIcon size={18} className="text-gray-400" />
                        Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => setRenameOpen(true)}>
                        <EditIcon size={18} className="text-gray-400" />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer">
                            <ShareIcon size={18} className="text-gray-400" />
                            Share
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={async () => await copyToClipboard(file.url)} className="cursor-pointer">
                                    <CopyIcon />
                                    Copy Link
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => setInfoOpen(true)}>
                        <InfoIcon size={18} className="text-gray-400" />
                        File Info
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex gap-2 cursor-pointer" variant="destructive" onClick={() => setDeleteOpen(true)}>
                        <Trash2Icon size={18} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <RenameFile open={renameOpen} onOpenChange={setRenameOpen} fileName={file.name} filePath={file.filePath} />
            <FileInformation open={infoOpen} onOpenChange={setInfoOpen} file={file} />
            <DeleteFile open={deleteOpen} onOpenChange={setDeleteOpen} fileId={file.fileId} fileUrl={file.url} />
            <FileDetails open={detailsOpen} onOpenChange={setDetailsOpen} file={file} />
        </>
    );
};