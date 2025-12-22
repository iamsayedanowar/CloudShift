// Modules

import { useEffect, useCallback } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { DeleteFileType } from "@/types/all-types";

export const DeleteFile = ({ open, onOpenChange, fileId, fileUrl }: DeleteFileType) => {
    const fetcher = useFetcher();
    const isLoading = fetcher.state !== 'idle';
    useEffect(() => {
        if (!fetcher.data) return;
        if (fetcher.data.ok) {
            toast.success("File deleted successfully");
            onOpenChange(false);
        } else {
            toast.error(fetcher.data.error ?? "Something went wrong. Please try again.");
        }
    }, [fetcher.data, onOpenChange]);
    const handleSubmit = useCallback(() => {
        // if (!fileId.trim()) {
        //     toast.error("Please select a file to delete.");
        //     return;
        // }
        fetcher.submit(
            {
                fileId,
                fileUrl,
            },
            {
                action: '/drive',
                method: 'delete',
                encType: 'application/json',
            }
        );
    }, [fileId, fileUrl]);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete File
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this file ?
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant='outline' onClick={() => onOpenChange(false)} disabled={fetcher.state === 'submitting'} className="cursor-pointer">
                        Cancel
                    </Button>
                    <Button variant='destructive' onClick={handleSubmit} disabled={isLoading} className="cursor-pointer">
                        {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};