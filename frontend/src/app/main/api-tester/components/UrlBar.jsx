
import { useRequestStore } from "@/store/useRequestStore";
import { useState } from "react";

const methods = [
  { value: "GET", color: "bg-green-500", label: "GET" },
  { value: "POST", color: "bg-blue-500", label: "POST" },
  { value: "PUT", color: "bg-yellow-500", label: "PUT" },
  { value: "DELETE", color: "bg-red-500", label: "DELETE" },
  { value: "PATCH", color: "bg-purple-500", label: "PATCH" },
  { value: "HEAD", color: "bg-gray-500", label: "HEAD" },
  { value: "OPTIONS", color: "bg-indigo-500", label: "OPTIONS" }
];

const UrlBar = ({ onExecute, onSave, loading }) => {
  const { request, updateRequest } = useRequestStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSend = () => {
    if (onExecute) onExecute();
  };

  const handleSave = () => {
    if (onSave) onSave();
  };

  const selectedMethod = methods.find(m => m.value === request.method) || methods[0];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex gap-3 w-full items-center">
        {/* Method Selector */}
        <div className="relative">
          <select
            value={request.method}
            onChange={e => updateRequest({ method: e.target.value })}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            {methods.map(method => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* URL Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://api.example.com/users"
            value={request.url}
            onChange={e => updateRequest({ url: e.target.value })}
          />
          {request.url && (
            <button
              onClick={() => updateRequest({ url: "" })}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSend}
            disabled={loading || !request.url.trim()}
            className={`px-6 py-2 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${loading || !request.url.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'
              }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Send
              </>
            )}
          </button>

          <button
            onClick={handleSave}
            disabled={!request.url.trim()}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${!request.url.trim()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md'
              }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Save
          </button>
        </div>
      </div>

      {/* Quick URL Suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs text-gray-500">Quick URLs:</span>
        {[
          "https://jsonplaceholder.typicode.com/posts",
          "https://httpbin.org/get",
          "https://api.github.com/users/octocat",
          "https://reqres.in/api/users"
        ].map(url => (
          <button
            key={url}
            onClick={() => updateRequest({ url })}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            {url.split('/')[2]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UrlBar;
