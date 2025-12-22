// Modules

import { Link } from "react-router";
import type { FolderCardType } from "@/types/all-types";
import { FolderIcon } from "lucide-react";
import FolderMenu from "@/components/FolderMenu";

interface FolderCardProps {
    folder: FolderCardType;
    refreshData?: () => void;
}

export const FolderCard = ({ folder, refreshData }: FolderCardProps) => {
    const path = folder.folderPath;
    const folderPath = path.substring(path.lastIndexOf('/') + 1);
    return (
        <div className="relative group">
            <Link className="flex items-center gap-2 capitalize border bg-muted p-4 rounded-lg cursor-pointer" to={`/drive/folders/${folderPath}`}>
                <FolderIcon />
                {folder?.name}
            </Link>
            <div className="absolute right-5 top-[50%] translate-y-[-40%]">
                <FolderMenu folder={folder} refreshData={refreshData} />
            </div>
        </div>
    );
};