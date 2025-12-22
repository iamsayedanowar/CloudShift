// Modules

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { deleteFolderAction } from "@/lib/actions";
import { toast } from "sonner";

interface DeleteFolderProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    folderName: string;
    folderPath: string;
    onSuccess: () => void;
}

const DeleteFolder = ({ open, setOpen, folderPath, onSuccess }: DeleteFolderProps) => {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteFolderAction(folderPath);
            toast.success("Folder deleted successfully");
            setOpen(false);
            onSuccess();
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>
                        Delete Folder
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this folder ?
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant='outline' onClick={() => setOpen(false)} className="cursor-pointer">
                        Cancel
                    </Button>
                    <Button variant='destructive' onClick={handleDelete} disabled={loading} className="cursor-pointer">
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteFolder;