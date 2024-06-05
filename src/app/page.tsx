import React from "react";

import { isSignedIn } from "./login/actions";
import EditorPage from "@/components/Editor";
import Menu from "@/components/Menu";
import MainProvider from "@/contexts/MainProvider";
import DocumentTitle from "@/components/DocumentTitle";

export default async function App() {
    const user = await isSignedIn();

    return (
        <MainProvider>
            <Menu user={user} />
            <DocumentTitle />
            <EditorPage />
        </MainProvider>
    );
}
