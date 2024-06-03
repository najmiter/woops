"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Menu from "@/components/Menu";
import { isSignedIn } from "./login/actions";
import { User } from "@supabase/supabase-js";

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);

function App() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [user, setUser] = useState<User | null>(null);

    const onEditorStateChange = (newEditorState: EditorState): void => {
        setEditorState(newEditorState);
    };

    useEffect(function () {
        async function getUser() {
            const user = await isSignedIn();
            if (user) setUser(user);
        }
        getUser();
    }, []);

    return (
        <div className="p-10 space-y-3">
            <Menu user={user} />
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                placeholder="Start typing here"
            />
        </div>
    );
}

export default App;
