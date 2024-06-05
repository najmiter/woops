"use client";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useMain } from "@/contexts/MainProvider";

export default function Menu({ user }: { user: User | null }) {
    const router = useRouter();
    const { handleSave, isThinking } = useMain();

    return (
        <div className="flex justify-between">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={handleSave}>
                            Save <MenubarShortcut>ctrl + S</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={() => router.push("/home")}>
                            Home
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            {isThinking && <div>Saving...</div>}
            <div className="flex gap-3">
                {user ? (
                    <div>
                        <form action="/auth/signout" method="post">
                            <Button variant="ghost" type="submit">
                                Sign out
                            </Button>
                        </form>
                    </div>
                ) : (
                    <Link href="/login">
                        <Button variant="ghost">Login</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
