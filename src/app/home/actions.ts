import { supabase } from "@/lib/supabase";
import { isSignedIn } from "../login/actions";

export async function getFiles() {
    const user = await isSignedIn();

    try {
        const { data, error } = await supabase
            .from("Woops")
            .select("*")
            .eq("user_id", user.id);

        return data;
    } catch {}
}
