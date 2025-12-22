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
    fileName: string;
    filePath: string;
    onSuccess?: () => void;
}

export const RenameFile = ({ open, onOpenChange, fileName, filePath, onSuccess }: Props) => {
    const fetcher = useFetcher();
    const [fileNewName, setFileNewName] = useState(fileName);
    const isLoading = fetcher.state !== 'idle';
    useEffect(() => {
        if (open) setFileNewName(fileName);
    }, [open, fileName]);
    useEffect(() => {
        if (!fetcher.data) return;
        if (fetcher.data.ok) {
            toast.success("File renamed successfully");
            onSuccess?.();
            onOpenChange(false);
        } else {
            toast.error(fetcher.data.error ?? "Something went wrong. Please try again.");
        }
    }, [onOpenChange, fetcher.data, onSuccess]);
    const handleSubmit = useCallback(() => {
        if (!fileNewName.trim()) {
            toast.error("File name cannot be empty");
            return;
        }
        fetcher.submit(
            {
                filePath,
                newName: fileNewName,
            },
            {
                action: '/drive',
                method: 'put',
                encType: 'application/json',
            }
        );
    }, [fileNewName, filePath]);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename File</DialogTitle>
                </DialogHeader>
                <Input value={fileNewName} onChange={(e) => setFileNewName(e.currentTarget.value)} placeholder="Rename File" className="mt-4" />
                <DialogFooter>
                    <Button variant='outline' onClick={() => onOpenChange(false)} disabled={fetcher.state === 'submitting'} className="cursor-pointer">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading} className="cursor-pointer">
                        {isLoading ? "Renaming..." : "Rename"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};