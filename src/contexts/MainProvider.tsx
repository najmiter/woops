"use client";

import { EditorState } from "draft-js";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

const MainContext = createContext<
    | {
          editorState: EditorState | undefined;
          setEditorState: Dispatch<SetStateAction<EditorState | undefined>>;
      }
    | undefined
>(undefined);

export default function MainProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [editorState, setEditorState] = useState<EditorState | undefined>(
        EditorState.createEmpty()
    );

    return (
        <MainContext.Provider
            value={{
                editorState,
                setEditorState,
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
