"use server";

import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function insertFile(editorState: any, title: string) {
    const {
        data: { user },
    } = await createClient().auth.getUser();

    await supabase.from("Woops").insert([
        {
            document_data: editorState,
            document_title: title,
            user_id: user?.id,
        },
    ]);

    revalidatePath("/home");
}
