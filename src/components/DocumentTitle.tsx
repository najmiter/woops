"use client";

import { useMain } from "@/contexts/MainProvider";

export default function DocumentTitle() {
    const { documentTitle, setDocumentTitle } = useMain();

    return (
        <div className="border-b py-2 rounded-md">
            <h1 className="pl-5 text-md font-semibold flex gap-3 text-stone-500">
                <span className="font-normal">Title</span>
                <input
                    className="outline-none w-full font-bold"
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    type="text"
                    value={documentTitle}
                    placeholder="Name your document here"
                />
            </h1>
        </div>
    );
}
