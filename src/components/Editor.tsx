"use client";

import React, { useEffect } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { supabase } from "@/lib/supabase";
import { useMain } from "@/contexts/MainProvider";

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);

export default function EditorPage() {
    const {
        editorState,
        setEditorState,
        documentId,
        handleSave,
        setDocumentTitle,
    } = useMain();
    const [error, setError] = useState("");

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
                        setDocumentTitle(data[0].document_title);
                    }
                } catch {}
            }

            if (documentId) getFiles(documentId);
            else setEditorState(EditorState.createEmpty());
        },
        [documentId, setEditorState, setDocumentTitle]
    );

    useEffect(() => {
        const keys_pressed: any = {};

        const handleKeyUp = (btn: KeyboardEvent) =>
            delete keys_pressed[btn.key];

        const handleKeyDown = (btn: KeyboardEvent) => {
            keys_pressed[btn.key] = true;

            if (keys_pressed["Control"] && keys_pressed["s"]) {
                handleSave();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

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
            wrapperStyle={{ paddingInline: "20px" }}
            editorStyle={{ height: "100vh" }}
            placeholder="Start typing here"
        />
    );
}
