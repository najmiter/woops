import { supabase } from "@/lib/supabase";

export async function getFiles(user_id: string) {
    const { data, error } = await supabase
        .from("Woops")
        .select("document_title")
        .eq("user_id", user_id);

    return data;
}
