import React from "react";

import { isSignedIn } from "./login/actions";
import EditorPage from "@/components/Editor";
import Menu from "@/components/Menu";

export default async function App() {
    const user = await isSignedIn();

    return (
        <div className="p-10 space-y-3">
            <Menu user={user} />
            <EditorPage />
        </div>
    );
}
