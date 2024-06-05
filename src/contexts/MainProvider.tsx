"use client";

import { insertFile } from "@/app/actions";
import { getFiles } from "@/app/home/actions";
import { saveFile } from "@/utils/actions";
import { User } from "@supabase/supabase-js";
import { EditorState, convertToRaw } from "draft-js";
import { useSearchParams } from "next/navigation";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
    useTransition,
} from "react";

const MainContext = createContext<
    | {
          editorState: EditorState | undefined;
          setEditorState: Dispatch<SetStateAction<EditorState | undefined>>;
          documentTitle: string;
          setDocumentTitle: Dispatch<SetStateAction<string>>;
          isThinking: boolean;
          handleSave: () => void;
          handleInsert: () => void;
          documentId: string | null;
      }
    | undefined
>(undefined);

export default function MainProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [editorState, setEditorState] = useState<EditorState | undefined>();
    const [isThinking, startTransaction] = useTransition();
    const [documentTitle, setDocumentTitle] = useState("");

    const [user, setUser] = useState<User | null>(null);

    const urlParams = useSearchParams();
    const documentId = urlParams.get("id");

    useEffect(
        function () {
            if (!documentId)
                getFiles().then((files) =>
                    setDocumentTitle(
                        `Untitled-document-${(files?.length || 0) + 1 || 1}`
                    )
                );
        },
        [documentId]
    );

    function handleSave() {
        if (!documentId || !editorState) return;

        startTransaction(() =>
            saveFile(editorState, documentId, documentTitle)
        );
    }

    function handleInsert() {
        if (!documentTitle || !editorState) return;

        startTransaction(() =>
            insertFile(
                convertToRaw(editorState.getCurrentContent()),
                documentTitle
            )
        );
    }

    return (
        <MainContext.Provider
            value={{
                editorState,
                setEditorState,
                isThinking,
                handleSave,
                handleInsert,
                documentId,
                documentTitle,
                setDocumentTitle,
            }}
        >
            <div className="space-y-3">{children}</div>
        </MainContext.Provider>
    );
}

export const useMain = () => {
    const thing = useContext(MainContext);
    if (!thing) throw Error;

    return thing;
};
