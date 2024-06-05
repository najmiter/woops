"use server";

import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/server";
import { EditorState, convertToRaw } from "draft-js";

export async function insertFile(editorState: any, title: string) {
    const {
        data: { user },
    } = await createClient().auth.getUser();

    const { data, error } = await supabase
        .from("Woops")
        .insert([
            {
                document_data: editorState,
                document_title: title,
                user_id: user?.id,
            },
        ])
        .select();
}
