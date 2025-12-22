// Modules

import { account, OAuthProvider } from "@/lib/appwrite";

export const handleOAuthLogin = () => {
    account.createOAuth2Session({
        provider: OAuthProvider.Google,
        success: 'https://cloud-shift.vercel.app/drive/home',
        // success: 'http://localhost:5173/drive/home',
    });
};