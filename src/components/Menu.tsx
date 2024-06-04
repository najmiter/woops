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
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";

export default function Menu({ user }: { user: User | null }) {
    return (
        <div className="flex justify-between">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Save <MenubarShortcut>⌘S</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
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
