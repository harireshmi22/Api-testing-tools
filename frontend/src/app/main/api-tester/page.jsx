"use client";

import { useState } from "react";
import UrlBar from "./components/UrlBar.jsx";
import RequestEditor from "./components/RequestEditor/RequestEditor.jsx";
import ResponseViewer from "./components/ReponseViewer/ResponseViewer.jsx";
import HistorySidebar from "./components/HistorySidebar/HistorySidebar.jsx";
import SaveRequestModal from "./components/SaveRequestModal.jsx";
import Navigation from "../../components/shared/Navigation.jsx";
// import AuthGuard from "../../components/shared/AuthGuard.jsx";
import { useRequestStore } from "@/store/useRequestStore";
import axios from "axios";


export default function ApiTesterPage() {
  const [activeTab, setActiveTab] = useState("params");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { request, response, loading, setResponse, setLoading, addToHistory } = useRequestStore();

  const executeRequest = async () => {
    setLoading(true);
    try {
      let data;
      // Filter out headers with empty keys before sending
      const filteredHeaders = request.headers && Array.isArray(request.headers)
        ? request.headers.filter(h => h.enabled && h.key && h.key.trim() !== "")
        : [];

      if (/^https?:\/\//.test(request.url) && !request.url.includes("localhost") && !request.url.includes("127.0.0.1")) {
        const res = await fetch(request.url, {
          method: request.method,
          headers: filteredHeaders.reduce((acc, h) => { acc[h.key] = h.value; return acc; }, {}),
          body: ["POST", "PUT", "PATCH", "DELETE"].includes(request.method) ? request.body : undefined,
        });
        data = {
          status: res.status,
          statusText: res.statusText,
          headers: Object.fromEntries(res.headers.entries()),
          data: await res.json().catch(() => res.text()),
          time: 0 // You can add timing if needed
        };
      } else {
        // Otherwise, proxy through backend
        let parsedBody = request.body;
        try {
          parsedBody = request.body && request.body.trim() ? JSON.parse(request.body) : undefined;
        } catch (e) {
          // If not valid JSON, send as text
        }
        const reqToSend = {
          ...request,
          headers: filteredHeaders,
          name: request.name || `${request.method} ${request.url}`,
          body: parsedBody,
        };
        const res = await axios("http://localhost:5000/api/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: reqToSend,
        });
        data = res.data;
      }
      setResponse(data);
      // Always add to history
      addToHistory({
        ...request,
        response: data,
        timestamp: new Date().toISOString(),
        name: request.name || `${request.method} ${request.url}`
      });
    } catch (error) {
      setResponse({
        error: error.message,
        time: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        <Navigation />
        <div className="flex h-[calc(100vh-65px)] bg-gray-100 gap-8">
          <div className="hidden md:block w-64 lg:w-72 shrink-0 h-full  border-r border-gray-200 bg-white">
            <HistorySidebar />
          </div>
          <div className="flex-1 flex flex-col p-4 overflow-hidden min-h-0">
            <div className="mb-4 shrink-0">
              <UrlBar onExecute={executeRequest} onSave={() => setShowSaveModal(true)} loading={loading} />
            </div>

            <div className="mb-4 bg-white p-2 rounded-lg shadow">
              <div className="flex border-b">
                {["Params", "Headers", "Body"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === tab.toLowerCase()
                      ? "border-b-2 border-blue-600 text-blue-600 bg-gray-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden min-h-0">
              <div className="min-h-0 overflow-hidden">
                <RequestEditor activeTab={activeTab} />
              </div>
              <div className="min-h-0 overflow-hidden">
                <ResponseViewer />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSaveModal && (
        <SaveRequestModal
          onClose={() => setShowSaveModal(false)}
          onSave={(name) => {
            addToHistory({
              ...request,
              name,
              timestamp: new Date().toISOString(),
            });
            setShowSaveModal(false);
          }}
        />
      )}
    </>
  );
}
