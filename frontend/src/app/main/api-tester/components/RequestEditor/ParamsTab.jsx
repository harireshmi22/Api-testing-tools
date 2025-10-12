
import { useRequestStore } from "@/store/useRequestStore";

const ParamsTab = () => {
  const { request, updateParam, addParam, removeParam } = useRequestStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-900">Query Parameters</span>
        <button
          type="button"
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          onClick={addParam}
        >
          + Add Param
        </button>
      </div>
      {request.params && request.params.length > 0 ? (
        request.params.map((param, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={param.enabled}
              onChange={e => updateParam(idx, { enabled: e.target.checked })}
              className="mr-2"
              title="Enable/Disable param"
            />
            <input
              type="text"
              placeholder="Key"
              value={param.key}
              onChange={e => updateParam(idx, { key: e.target.value })}
              className="px-2 py-1 border rounded w-1/3 text-black"
            />
            <input
              type="text"
              placeholder="Value"
              value={param.value}
              onChange={e => updateParam(idx, { value: e.target.value })}
              className="px-2 py-1 border rounded w-1/2 text-black"
            />
            <button
              type="button"
              className="text-red-500 hover:text-red-700 ml-2"
              onClick={() => removeParam(idx)}
              title="Remove param"
            >
              &times;
            </button>
          </div>
        ))
      ) : (
        <div className="text-gray-800 text-base">No parameters added.</div>
      )}
    </div>
  );
};

export default ParamsTab;
