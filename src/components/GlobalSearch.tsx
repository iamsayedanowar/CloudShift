import * as React from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from "@/components/ui/command";
import { searchFilesAction } from "@/lib/actions";
import { useNavigate, useLocation } from "react-router";
import { FileIcon, FolderIcon, Loader2 } from "lucide-react";

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);
    React.useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }
        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await searchFilesAction(query);
                setResults(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);
    const handleSelect = (item: any) => {
        setOpen(false);
        if (item.type === "folder") {
            const path = item.filePath || item.folderPath;
            const cleanPath = path.startsWith('/') ? path.substring(1) : path;
            navigate(`/drive/folders/${cleanPath}`);
        } else {
            const fileObject = {
                $id: item.fileId,
                fileId: item.fileId,
                name: item.name,
                url: item.url,
                thumbnail: item.thumbnailUrl || item.url,
                mime: item.mime || (item.fileType === 'image' ? 'image/jpeg' : 'application/octet-stream'),
                size: item.size,
                $createdAt: item.createdAt,
            };
            navigate(`${location.pathname}?fileId=${item.fileId}`, {
                replace: true,
                state: { openedFile: fileObject }
            });
        }
    };
    return (
        <>
            <button onClick={() => setOpen(true)} className="w-full h-8 px-2 rounded-md border bg-muted/50 text-sm text-muted-foreground flex items-center hover:bg-muted/80 transition-colors cursor-text">
                <span className="text-xs">Search files...</span>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a filename..." value={query} onValueChange={setQuery} />
                <CommandList>
                    <CommandEmpty>
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                                Searching...
                            </div>
                        ) : "No results found."}
                    </CommandEmpty>
                    {results.length > 0 && (
                        <CommandGroup heading="Results">
                            {results.map((item) => (
                                <CommandItem key={item.fileId || item.filePath} value={item.name} onSelect={() => handleSelect(item)} className="cursor-pointer">
                                    {item.type === 'folder' ? (
                                        <FolderIcon className="mr-2 h-4 w-4 text-gray-500" />
                                    ) : (
                                        <FileIcon className="mr-2 h-4 w-4 text-gray-500" />
                                    )}
                                    <span className="truncate">
                                        {item.name}
                                    </span>
                                    <span className="ml-auto text-xs text-muted-foreground truncate max-w-[100px]">
                                        {item.filePath}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    <CommandSeparator />
                </CommandList>
            </CommandDialog>
        </>
    );
}