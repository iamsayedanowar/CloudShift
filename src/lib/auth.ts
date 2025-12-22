// Modules

import { account, OAuthProvider } from "@/lib/appwrite";

export const handleOAuthLogin = () => {
    account.createOAuth2Session({
        provider: OAuthProvider.Google,
        success: 'http://localhost:5173/drive/home',
    });
};