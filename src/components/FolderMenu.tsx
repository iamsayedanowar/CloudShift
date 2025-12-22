// Modules

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Edit, Trash2Icon, EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";
import RenameFolder from "@/components/RenameFolder";
import DeleteFolder from "@/components/DeleteFolder";
import type { FolderCardType } from "@/types/all-types";

interface FolderMenuProps {
    folder: FolderCardType;
    refreshData?: () => void;
}

const FolderMenu = ({ folder, refreshData }: FolderMenuProps) => {
    const [isRenameOpen, setIsRenameOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const onActionSuccess = () => {
        if (refreshData) refreshData();
        else window.location.reload();
    };
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVerticalIcon className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={() => setIsRenameOpen(true)} className="cursor-pointer">
                        <Edit size={18} className="text-gray-400" />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsDeleteOpen(true)} variant='destructive' className="cursor-pointer">
                        <Trash2Icon size={18} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <RenameFolder open={isRenameOpen} setOpen={setIsRenameOpen} currentName={folder.name} currentPath={folder.folderPath} onSuccess={onActionSuccess} />
            <DeleteFolder open={isDeleteOpen} setOpen={setIsDeleteOpen} folderName={folder.name} folderPath={folder.folderPath} onSuccess={onActionSuccess} />
        </>
    );
};

export default FolderMenu;