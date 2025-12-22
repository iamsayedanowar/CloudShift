// Modules

import { useState, useEffect } from "react";
import { Outlet, useLoaderData, useSearchParams, useLocation, useNavigate } from "react-router";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/AppSidebar";
import { FolderProvider } from "@/contexts/FolderContext";
import { FileDetails } from "@/components/FileDetails";

export const AppLayout = () => {
    const { user } = useLoaderData() as { user: { $id: string; }; };
    const folderName = user.$id;
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [viewFile, setViewFile] = useState<any>(null);
    useEffect(() => {
        const fileIdFromUrl = searchParams.get("fileId");
        const fileDataFromState = location.state?.openedFile;
        if (fileIdFromUrl && fileDataFromState) {
            setViewFile(fileDataFromState);
            setDetailsOpen(true);
        }
    }, [searchParams, location.state]);
    const handleClose = () => {
        setDetailsOpen(false);
        setSearchParams(params => {
            params.delete("fileId");
            return params;
        }, { replace: true });
        navigate(location.pathname, { replace: true, state: {} });
    };
    return (
        <FolderProvider folderName={folderName}>
            <SidebarProvider>
                <TooltipProvider delayDuration={0} disableHoverableContent>
                    <AppSidebar collapsible="icon" variant="sidebar" />
                    <SidebarInset>
                        <header className="flex items-center p-2 border-b">
                            <SidebarTrigger className="mr-2" />
                            <h1 className="font-semibold text-lg">
                                Dashboard
                            </h1>
                        </header>
                        <main className="flex-1 p-4 overflow-y-auto">
                            <Outlet />
                        </main>
                    </SidebarInset>
                    {viewFile && (
                        <FileDetails open={detailsOpen} onOpenChange={(isOpen) => { if (!isOpen) { handleClose(); } }} file={viewFile} />
                    )}
                </TooltipProvider>
            </SidebarProvider >
        </FolderProvider>
    );
};