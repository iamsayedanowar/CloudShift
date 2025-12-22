// Modules

import { redirect } from "react-router";
import { account } from "@/lib/appwrite";
import { createFolder } from "@/routes/actions/driveActions";
import type { LoaderFunction } from "react-router";
import { AppwriteException } from "appwrite";

export const driveLoader: LoaderFunction = async () => {
    try {
        const currentSession = await account.getSession({ sessionId: "current" });
        const user = await account.get();
        const folderName = user.$id;
        await createFolder({ folderName, parentFolderPath: '/' });
        return { user, currentSession };
    } catch (err) {
        if (err instanceof AppwriteException) {
            return redirect("/auth/login");
        }
        throw err;
    }
};