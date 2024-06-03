import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { login, signup } from "./actions";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <form className="basis-1/3 flex flex-col gap-3 border border-slate-100 shadow-lg p-10 py-16 rounded-lg">
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
                <div className="flex gap-3">
                    <Button formAction={login}>Log in</Button>
                    <Button variant="ghost" formAction={signup}>
                        Sign up
                    </Button>
                </div>
            </form>
        </div>
    );
}
