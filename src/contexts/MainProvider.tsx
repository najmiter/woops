"use client";

import { saveFile } from "@/utils/actions";
import { EditorState } from "draft-js";
import { useSearchParams } from "next/navigation";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
    useTransition,
} from "react";

const MainContext = createContext<
    | {
          editorState: EditorState | undefined;
          setEditorState: Dispatch<SetStateAction<EditorState | undefined>>;
          isThinking: boolean;
          handleSave: () => void;
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
    const urlParams = useSearchParams();
    const documentId = urlParams.get("id");

    function handleSave() {
        if (!documentId || !editorState) return;

        startTransaction(() => saveFile(editorState, documentId));
    }

    return (
        <MainContext.Provider
            value={{
                editorState,
                setEditorState,
                isThinking,
                handleSave,
                documentId,
            }}
        >
            <div className="p-10 space-y-3">{children}</div>
        </MainContext.Provider>
    );
}

export const useMain = () => {
    const thing = useContext(MainContext);
    if (!thing) throw Error;

    return thing;
};
