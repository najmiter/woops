import DocumentCard from "@/components/DocumentCard";
import { getFiles } from "./actions";

export default async function page() {
    const data = await getFiles();

    return (
        <div className="h-screen bg-stone-100 ">
            <main className="max-w-[80rem] space-y-10 mx-auto p-10 rounded-lg h-full shadow-md">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold uppercase">Your files</h1>
                    {!!data?.length && (
                        <p className="text-md">
                            Select any of your files to start editing
                        </p>
                    )}
                </div>
                {data?.length ? (
                    <div className="flex flex-col gap-3">
                        {data?.map((doc, i) => (
                            <div
                                key={i}
                                className="cursor-pointer hover:underline"
                            >
                                <DocumentCard document={doc} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        You don&apos;t have any files saved yet :)
                    </div>
                )}
            </main>
        </div>
    );
}
