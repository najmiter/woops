import React from "react";

import { isSignedIn } from "./login/actions";
import EditorPage from "@/components/Editor";
import Menu from "@/components/Menu";
import MainProvider from "@/contexts/MainProvider";

export default async function App() {
    const user = await isSignedIn();

    return (
        <MainProvider>
            <Menu user={user} />
            <EditorPage />
        </MainProvider>
    );
}
