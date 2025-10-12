import React from "react";
import { useRequestStore } from "@/store/useRequestStore";

const BodyTab = () => {
    const { request, updateRequest } = useRequestStore();

    return (
        <div className="flex flex-col h-full">
            <label className="mb-2 font-bold text-gray-900">Request Body</label>
            <textarea
                className="w-full h-64 p-2 border rounded-md font-mono resize-y text-gray-900 bg-white"
                placeholder="Enter JSON, text, or form data here..."
                value={request.body || ""}
                onChange={(e) => updateRequest({ body: e.target.value })}
                spellCheck={false}
            />
        </div>
    );
};

export default BodyTab;
