// Modules

import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export const RootError = () => {
    const navigate = useNavigate();

    return (
        <section className="flex min-h-screen items-start bg-background py-16 md:items-center md:py-24">
            <div className="mx-auto max-w-container grow px-4 md:px-10">
                <div className="w-full max-w-3xl space-y-8 md:space-y-12">
                    <div className="space-y-4 md:space-y-6">
                        <div className="grid gap-3">
                            <span className="font-semibold text-primary">Error 404</span>
                            <h1 className="text-4xl font-semibold text-foreground md:text-5xl lg:text-6xl">
                                Page not found
                            </h1>
                        </div>
                        <p className="text-muted-foreground md:text-xl">
                            The page you're looking for doesn't exist.
                        </p>
                    </div>
                    <div className="flex flex-col-reverse gap-3 sm:flex-row">
                        <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
                            <ArrowLeftIcon className="text-muted-foreground" />
                            Go back
                        </Button>
                        <Button size="lg" asChild>
                            <Link to="/drive/home" viewTransition>
                                Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};