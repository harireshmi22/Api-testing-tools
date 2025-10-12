"use client";

import StatusCode from "./StatusCode";
import ResponseTime from "./ResponseTime";
import { useRequestStore } from "@/store/useRequestStore";
import { useState } from "react";

export default function ResponseViewer() {
  const { response, loading } = useRequestStore();
  const [activeTab, setActiveTab] = useState("body");

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center">
        <div className="animate-pulse text-gray-800 font-semibold">
          Waiting for response...
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center">
        <div className="text-gray-800 font-semibold">Send a request to see response</div>
      </div>
    );
  }

  // Show error if present
  if (response.error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center">
        <div className="text-red-700 font-bold text-lg">{response.error}</div>
      </div>
    );
  }

  // Helper to pretty print headers
  const renderHeaders = (headersObj) => {
    if (!headersObj || typeof headersObj !== "object") return "No headers";
    return Object.entries(headersObj).map(([key, value]) => `${key}: ${value}`).join("\n");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col min-h-0">
      <div className="flex items-center gap-4 mb-4">
        <StatusCode status={response.status} />
        <ResponseTime time={response.time} />
        <span className="text-sm text-gray-800 font-semibold">{response.statusText}</span>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Postman-like tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`px-4 py-2 font-medium border-b-2 ${activeTab === "body" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("body")}
            >
              Body
            </button>
            <button
              className={`px-4 py-2 font-medium border-b-2 ${activeTab === "headers" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("headers")}
            >
              Headers
            </button>
          </nav>
        </div>

        {/* Response body or headers with syntax highlighting */}
        <div className="flex-1 min-h-0 p-2 flex flex-col overflow-hidden">
          <div className="bg-gray-50 rounded border border-gray-200 flex-1 min-h-0 overflow-auto" style={{ height: '100%' }}>
            {activeTab === "body" ? (
              <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800 w-full h-full overflow-auto p-4" style={{
                fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                lineHeight: '1.5',
                minHeight: 0,
                maxHeight: '100%',
                height: '100%',
                overflow: 'auto',
              }}>
                {typeof response.data === "string"
                  ? response.data
                  : JSON.stringify(response.data, null, 2)}
              </pre>
            ) : (
              <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800 w-full h-full overflow-auto" style={{
                fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                lineHeight: '1.5',
                minHeight: 0,
                maxHeight: '100%',
                height: '100%',
                overflow: 'auto',
              }}>
                {renderHeaders(response.headers)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
