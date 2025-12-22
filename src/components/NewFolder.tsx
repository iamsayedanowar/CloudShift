// Modules

import { useState, useEffect, useCallback } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NewFolder = ({ open, onOpenChange }: Props) => {
    const fetcher = useFetcher();
    const [folderName, setFolderName] = useState('Untitled Folder');
    const isLoading = fetcher.state !== 'idle';
    useEffect(() => {
        if (!fetcher.data) return;
        if (fetcher.data.ok) {
            toast.success("Folder created successfully");
            onOpenChange(false);
        } else {
            console.log(fetcher.data.error);
            toast.error(fetcher.data.error ?? "Something went wrong. Please try again.");
        }
    }, [fetcher.data, onOpenChange]);
    const handleSubmit = useCallback(() => {
        fetcher.submit({
            folderName
        }, {
            action: '/drive',
            method: 'post',
            encType: 'application/json',
        });
    }, [folderName]);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New Folder
                    </DialogTitle>
                </DialogHeader>
                <Input id="folderName" value={folderName} onChange={(e) => setFolderName(e.currentTarget.value)} placeholder="Untitled Folder" className="mt-4" required />
                <DialogFooter>
                    <Button variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading} className="cursor-pointer">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading} className="cursor-pointer">
                        {isLoading ? "Creating..." : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};