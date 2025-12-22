// Modules

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FileInfo } from "@/components/FileInfo";
import type { File } from "@/types/all-types";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    file: File;
}

export const FileInformation = ({ open, onOpenChange, file }: Props) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        File Information
                    </SheetTitle>
                    <SheetDescription>
                        Details
                    </SheetDescription>
                </SheetHeader>
                <div className="px-5">
                    <FileInfo file={file} />
                </div>
            </SheetContent>
        </Sheet>
    );
};