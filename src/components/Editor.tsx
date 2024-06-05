"use client";

import React, { useEffect } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);

export default function EditorPage() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const urlParams = useSearchParams();

    useEffect(
        function () {
            async function getFiles(id: string) {
                const { data, error } = await supabase
                    .from("Woops")
                    .select("*")
                    .eq("id", id);

                if (data) {
                    const contentState = convertFromRaw(data[0].document_data);
                    const editorState =
                        EditorState.createWithContent(contentState);

                    setEditorState(editorState);
                }
            }

            const id = urlParams.get("id");
            if (id) getFiles(id);
        },
        [urlParams]
    );

    const onEditorStateChange = (newEditorState: EditorState): void => {
        setEditorState(newEditorState);
    };

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            placeholder="Start typing here"
        />
    );
}
