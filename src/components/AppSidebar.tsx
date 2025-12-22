// Modules

import { useState } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavUser } from "@/components/NavUser";
import { UploadFile } from "@/components/UploadFile";
import { NewFolder } from "@/components/NewFolder";
import { SIDEBAR_LINKS } from "@/constants";
import { Logo } from "@/assets/logo";
import { FolderPlusIcon, PlusIcon, UploadIcon, SearchIcon } from "lucide-react";
import { GlobalSearch } from "@/components/GlobalSearch";

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const { state } = useSidebar();
    const location = useLocation();
    const [openUpload, setOpenUpload] = useState(false);
    const [openCreateFolder, setOpenCreateFolder] = useState(false);
    return (
        <>
            <Sidebar {...props}>
                <SidebarHeader>
                    <Link to="/drive/home">
                        <Logo variant="icon" className={cn(state === "collapsed" ? "size-8" : "size-8")} />
                    </Link>
                </SidebarHeader>
                <div className={cn(state === "collapsed" ? "px-0" : "px-2")}>
                    {state === 'collapsed' ? (
                        <Button variant='ghost' size='icon' onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))} title="Search">
                            <SearchIcon />
                        </Button>
                    ) : (
                        <GlobalSearch />
                    )}
                </div>
                <SidebarContent className="px-2 mt-3">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button size={state === "collapsed" ? "icon" : "default"} className={cn(state === "collapsed" && "size-8", "cursor-pointer")}>
                                        <PlusIcon /> {state === "expanded" && "New"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" side="right" className="w-50 bg-muted">
                                    <DropdownMenuItem onClick={() => setOpenCreateFolder(true)} className="cursor-pointer">
                                        <FolderPlusIcon className="mr-2 size-4" />
                                        Create Folder
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOpenUpload(true)} className="cursor-pointer">
                                        <UploadIcon className="mr-2 size-4" />
                                        Upload File
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                        {SIDEBAR_LINKS.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton tooltip={item.title} isActive={location.pathname === item.url} asChild>
                                    <Link to={item.url} className="flex items-center gap-2">
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <UploadFile open={openUpload} onOpenChange={setOpenUpload} />
            <NewFolder open={openCreateFolder} onOpenChange={setOpenCreateFolder} />
        </>
    );
};