// Modules

import { createContext, useContext } from "react";

type Props = {
    folderName: string;
    children: React.ReactNode;
};

const FolderContext = createContext<string | null>(null);

export const FolderProvider = ({ folderName, children }: Props) => {
    return (
        <FolderContext.Provider value={folderName}>
            {children}
        </FolderContext.Provider>
    );
};

export const useFolder = () => {
    const ctx = useContext(FolderContext);
    if (!ctx) {
        throw new Error('useFolder must be used within a FolderProvider');
    }
    return ctx;
};