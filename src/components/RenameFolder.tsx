// Modules

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { renameFolderAction } from "@/lib/actions";
import { toast } from "sonner";

interface RenameFolderProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    currentName: string;
    currentPath: string;
    onSuccess: () => void;
}

const RenameFolder = ({ open, setOpen, currentName, currentPath, onSuccess }: RenameFolderProps) => {
    const [newName, setNewName] = useState(currentName);
    const [loading, setLoading] = useState(false);
    const handleRename = async () => {
        if (!newName || newName === currentName) return;
        setLoading(true);
        try {
            await renameFolderAction(currentPath, newName);
            toast.success("Folder renamed successfully");
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Rename Folder
                    </DialogTitle>
                </DialogHeader>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Rename Folder" className="mt-4" />
                <DialogFooter>
                    <Button variant='outline' onClick={() => setOpen(false)} className="cursor-pointer">
                        Cancel
                    </Button>
                    <Button onClick={handleRename} disabled={loading} className="cursor-pointer">
                        {loading ? "Renaming..." : "Rename"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RenameFolder;