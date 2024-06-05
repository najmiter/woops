"use server";

import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function insertFile(editorState: any, title: string) {
    const {
        data: { user },
    } = await createClient().auth.getUser();

    const { data }: any = await supabase
        .from("Woops")
        .insert([
            {
                document_data: editorState,
                document_title: title,
                user_id: user?.id,
            },
        ])
        .select();

    revalidatePath("/home");
    redirect(`/?id=${data[0].id}`);
}
