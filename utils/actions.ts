import { supabase } from "@/lib/supabase";
import { EditorState, convertToRaw } from "draft-js";

export async function saveFile(
    editorState: EditorState,
    id: string,
    title: string = ""
) {
    await supabase
        .from("Woops")
        .update({
            document_data: convertToRaw(editorState.getCurrentContent()),
            document_title: title,
        })
        .eq("id", id);
}
