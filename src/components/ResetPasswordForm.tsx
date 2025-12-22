// Modules

import React, { useCallback, useEffect } from "react";
import { useFetcher, useSearchParams } from "react-router";
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
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const ResetPasswordForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
    const fetcher = useFetcher();
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });
    const isLoading = fetcher.state !== 'idle';
    useEffect(() => {
        if (!fetcher.data) return;
        if (fetcher.data.ok) {
            toast.success("Password has been reset successfully");
            form.reset();
        } else {
            toast.error(fetcher.data.error ?? "Something went wrong. Please try again.");
        }
    }, [fetcher.data, form]);
    // Handle submit
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback((values) => {
        fetcher.submit({
            ...values,
            userId,
            secret,
        }, { method: 'post', encType: 'application/json' });
    },
        [userId, secret],
    );
    return (
        <div className={cn('flex flex-col gap-6', className)}{...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Set new password</CardTitle>
                    <CardDescription>
                        Enter your new password below to reset your account password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                            <div className="grid gap-6">
                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Set new password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm new password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type="submit" disabled={isLoading} className="w-full cursor-pointer">
                                    {isLoading && <Loader2Icon className="animate-spin" />}
                                    Reset password
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