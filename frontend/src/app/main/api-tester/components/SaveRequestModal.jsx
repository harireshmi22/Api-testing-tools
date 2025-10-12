
import { useState } from "react";
import { useRequestStore } from "@/store/useRequestStore";

const SaveRequestModal = ({ onClose }) => {
    const { request, addToHistory } = useRequestStore();
    const [name, setName] = useState(request.name || "");

    const handleSave = () => {
        addToHistory({
            ...request,
            name: name || "Unnamed Request",
            createdAt: new Date().toISOString(),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Save Request</h2>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded mb-4 text-black"
                    placeholder="Request Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveRequestModal;
