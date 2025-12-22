// Modules

import { account } from "@/lib/appwrite";
import type { ActionFunction } from "react-router";
import { AppwriteException } from "appwrite";

export const forgotPasswordAction: ActionFunction = async ({ request }) => {
    const data = (await request.json()) as { email: string; };
    try {
        await account.createRecovery({
            email: data.email,
            url: `${new URL(request.url).origin}/auth/reset-password`,
        });
        return { ok: true, message: "Password recovery email sent. Please check your inbox." };
    } catch (err) {
        if (err instanceof AppwriteException) {
            return { ok: false, error: err };
        }
        throw err;
    }
};