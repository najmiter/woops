import { isSignedIn } from "../login/actions";
import { getFiles } from "./actions";

export default async function page() {
    const user = await isSignedIn();
    const data = await getFiles(user.id);

    return (
        <div className="h-screen bg-stone-100 ">
            <main className="max-w-[80rem] space-y-10 mx-auto p-10 rounded-lg h-full shadow-md">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold uppercase">Your files</h1>
                    <p className="text-sm">Here are all your files</p>
                </div>
                <div className="flex flex-col gap-3">
                    {data?.map((doc, i) => (
                        <div
                            key={i}
                            className="cursor-pointer hover:bg-stone-200"
                        >
                            <DocumentCard document={doc} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

function DocumentCard({ document }: any) {
    return (
        <div className="w-full px-5 py-3 rounded-md ring-stone-200 ring-1 shadow-md">
            <h1 className="text-lg font-semibold">{document.document_title}</h1>
        </div>
    );
}
