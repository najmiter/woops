"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { login, signup } from "./actions";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const [isThinking, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [message, setMessage] = useState<string | undefined>("");

    function handleLogin(formData: FormData) {
        setError("");
        startTransition(() => {
            login(formData).then((data) => setError(data?.error || ""));
        });
    }

    function handleSignup(formData: FormData) {
        setError("");
        startTransition(() => {
            signup(formData).then((data) => setMessage(data?.error));
        });
    }

    return (
        <div className="flex items-center justify-center h-screen px-3 bg-gradient-to-r from-slate-900 to-slate-800">
            <form className="w-full max-w-[30rem] flex flex-col gap-3 border bg-white border-slate-100 shadow-lg p-10 rounded-lg">
                <h1 className="font-semibold text-2xl text-center mb-5">
                    Log in or sign up
                </h1>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        name="password"
                        required
                    />
                </div>
                {error && (
                    <div className="text-sm bg-destructive/10 text-destructive px-5 py-3 rounded-md">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="text-sm bg-emerald-800/10 text-emerald-500 px-5 py-3 rounded-md">
                        {message}
                    </div>
                )}
                <div
                    className={cn("flex flex-col gap-3 mt-5", {
                        "opacity-55 pointer-events-none cursor-progress":
                            isThinking,
                    })}
                >
                    <Button formAction={handleLogin}>Log in</Button>
                    <Button variant="outline" formAction={handleSignup}>
                        Sign up
                    </Button>
                </div>
            </form>
        </div>
    );
}
