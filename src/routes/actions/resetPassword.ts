// Modules

import { redirect } from "react-router";
import { account } from "@/lib/appwrite";
import type { ActionFunction } from "react-router";
import { AppwriteException } from "appwrite";

export const resetPasswordAction: ActionFunction = async ({ request }) => {
    const data = (await request.json()) as { userId: string, secret: string, password: string; };
    try {
        await account.updateRecovery(data);
        return redirect('/auth/login');
    } catch (err) {
        if (err instanceof AppwriteException) {
            return { ok: false, error: err };
        }
        throw err;
    }
};