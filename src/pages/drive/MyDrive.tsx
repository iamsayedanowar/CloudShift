// Modules

import { useLoaderData, useRevalidator } from "react-router";
import { FileCard } from "@/components/FileCard";
import type { File } from "@/types/all-types";
import { FolderCard } from "@/components/FolderCard";

export const MyDrive = () => {
    const { files, folders } = useLoaderData() as { files: File[], folders: any[]; };
    const revalidator = useRevalidator();
    return (
        <>
            <h1 className="text-2xl font-medium">
                My Drive
            </h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {folders.map((folder, i: number) => (
                    <FolderCard key={i} folder={folder} refreshData={() => revalidator.revalidate()} />
                ))}
            </div>
            <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {files.map((file: File, i: number) => (
                    <FileCard file={file} key={i} />
                ))}
            </section>
        </>
    );
};