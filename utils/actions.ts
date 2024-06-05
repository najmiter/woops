import { supabase } from "@/lib/supabase";
import { EditorState, convertToRaw } from "draft-js";

export async function saveFile(editorState: EditorState, id: string) {
    await supabase
        .from("Woops")
        .update({
            document_data: convertToRaw(editorState.getCurrentContent()),
        })
        .eq("id", id);
}
