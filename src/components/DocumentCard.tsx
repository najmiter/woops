import Link from "next/link";

export default function DocumentCard({ document }: any) {
    return (
        <Link href={`/?id=${document.id}`}>
            <div className="w-full px-5 py-3 rounded-md ring-stone-200 ring-1 shadow-md">
                <h1 className="text-lg font-semibold">
                    {document.document_title}
                </h1>
            </div>
        </Link>
    );
}
