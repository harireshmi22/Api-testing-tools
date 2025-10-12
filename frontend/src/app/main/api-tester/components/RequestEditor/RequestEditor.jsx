"use client";

import HeadersTab from "./HeadersTab";
import BodyTab from "./BodyTab";
import ParamsTab from "./ParamsTab";
import { useRequestStore } from "@/store/useRequestStore";

export default function RequestEditor({ activeTab }) {
  const { request, updateRequest } = useRequestStore();

  const renderTabContent = () => {
    switch (activeTab) {
      case "headers":
        return <HeadersTab />;
      case "body":
        return <BodyTab />;
      case "params":
      default:
        return <ParamsTab />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Request</h2>
      <div className="flex-1 overflow-auto">{renderTabContent()}</div>

      <div className="mt-4 pt-4 border-t">
        <input
          type="text"
          placeholder="Request Name (optional)"
          value={request.name || ""}
          onChange={(e) => updateRequest({ name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
}
