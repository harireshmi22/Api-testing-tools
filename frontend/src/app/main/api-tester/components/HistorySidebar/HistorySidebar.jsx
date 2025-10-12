"use client";

import { useRequestStore } from "@/store/useRequestStore";

export default function HistorySidebar() {
  const { history, loadFromHistory, clearHistory } = useRequestStore();

  return (
    <div className="w-80 bg-white border-r h-screen flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">History</h2>
        <button
          onClick={clearHistory}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {history.length === 0 ? (
          <div className="p-4 text-center text-gray-600">No history yet</div>
        ) : (
          <ul>
            {history.map((item, index) => (
              <li key={index} className="border-b">
                <button
                  onClick={() => loadFromHistory(item)}
                  className="w-full p-4 text-left hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${item.method === "GET"
                          ? "bg-green-100 text-green-800"
                          : item.method === "POST"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.method === "PUT"
                              ? "bg-blue-100 text-blue-800"
                              : item.method === "DELETE"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {item.method}
                    </span>
                    <span className="truncate text-sm font-medium">
                      {item.name || "Unnamed Request"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {item.url}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
