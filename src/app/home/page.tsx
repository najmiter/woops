import { isSignedIn } from "../login/actions";
import { getFiles } from "./actions";

export default async function page() {
    const user = await isSignedIn();
    const data = await getFiles(user.id);

    console.log(data);

    return (
        <div className="h-screen">
            <main>
                <h1>Your files</h1>
            </main>
        </div>
    );
}
