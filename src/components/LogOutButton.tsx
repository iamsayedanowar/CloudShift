// Modules

import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCallback } from "react";
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";

export const LogOutButton = () => {
    const navigate = useNavigate();
    const handleLogout = useCallback(async () => {
        try {
            await account.deleteSession({ sessionId: "current" });
            toast.success("Logged out successfully");
            navigate("/", { viewTransition: true });
        } catch (err) {
            toast.error("Failed to log out");
        }
    }, []);
    return (
        <Button variant="ghost" color="secondary" onClick={handleLogout} className="cursor-pointer">
            Sign Out
        </Button>
    );
};