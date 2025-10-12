
import { useRequestStore } from "@/store/useRequestStore";

const HeadersTab = () => {
    const { request, updateHeader, addHeader, removeHeader } = useRequestStore();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-900">Headers</span>
                <button
                    type="button"
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    onClick={addHeader}
                >
                    + Add Header
                </button>
            </div>
            
            {request.headers && request.headers.length > 0 ? (
                request.headers.map((header, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1">
                        <input
                            type="checkbox"
                            checked={header.enabled}
                            onChange={e => updateHeader(idx, { enabled: e.target.checked })}
                            className="mr-2 text-black"
                            title="Enable/Disable header"
                        />
                        <input
                            type="text"
                            placeholder="Key"
                            value={header.key}
                            onChange={e => updateHeader(idx, { key: e.target.value })}
                            className="px-2 py-1 border rounded w-1/3 text-black"
                        />
                        <input
                            type="text"
                            placeholder="Value"
                            value={header.value}
                            onChange={e => updateHeader(idx, { value: e.target.value })}
                            className="px-2 py-1 border rounded w-1/2 text-black"
                        />
                        <button
                            type="button"
                            className="text-red-500 hover:text-red-700 ml-2"
                            onClick={() => removeHeader(idx)}
                            title="Remove header"
                        >
                            &times;
                        </button>
                    </div>
                ))
            ) : (
                <div className="text-gray-800 text-base">No headers added.</div>
            )}
        </div>
    );
};

export default HeadersTab;
