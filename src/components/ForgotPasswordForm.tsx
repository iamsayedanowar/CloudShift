// Modules

import React, { useCallback, useEffect } from "react";
import { useFetcher } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import type { SubmitHandler } from "react-hook-form";

const formSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const ForgotPasswordForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
    const fetcher = useFetcher();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });
    const isLoading = fetcher.state !== 'idle';
    useEffect(() => {
        if (!fetcher.data) return;
        if (fetcher.data.ok) {
            toast.success("Password recovery email sent. Please check your inbox.");
            form.reset();
        } else {
            toast.error(fetcher.data.error ?? "Something went wrong. Please try again.");
        }
    }, [fetcher.data, form]);
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback((values) => {
        fetcher.submit(values, { method: 'post', encType: 'application/json' });
    },
        [],
    );
    return (
        <div className={cn('flex flex-col gap-6', className)}{...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Forgot password</CardTitle>
                    <CardDescription>
                        Enter your email to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                            <div className="grid gap-6">
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter your email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type="submit" disabled={isLoading} className="w-full cursor-pointer">
                                    {isLoading && <Loader2Icon className="animate-spin" />}
                                    Send reset link
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                <Button variant="link" asChild>
                                    <Link to="/auth/login" viewTransition>
                                        <ArrowLeftIcon />
                                        Back to login
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};