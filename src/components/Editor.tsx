"use client";

import React, { useEffect } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useMain } from "@/contexts/MainProvider";

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);

export default function EditorPage() {
    const { editorState, setEditorState } = useMain();

    const [error, setError] = useState("");
    const urlParams = useSearchParams();

    const documentId = urlParams.get("id");

    useEffect(
        function () {
            async function getFiles(id: string) {
                try {
                    const { data, error } = await supabase
                        .from("Woops")
                        .select("*")
                        .eq("id", id);

                    if (error) return setError(error.message);

                    if (data) {
                        const contentState = convertFromRaw(
                            data[0].document_data
                        );
                        const editorState =
                            EditorState.createWithContent(contentState);

                        setEditorState(editorState);
                    }
                } catch {}
            }

            if (documentId) getFiles(documentId);
        },
        [documentId, setEditorState]
    );

    const onEditorStateChange = (newEditorState: EditorState): void => {
        setEditorState(newEditorState);
    };

    if (error)
        return (
            <div className="text-destructive text-center bg-destructive/20 py-3 px-5 w-fit mx-auto rounded-md">
                Something went wrong. Please try again
            </div>
        );

    if (!editorState) return null;

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
