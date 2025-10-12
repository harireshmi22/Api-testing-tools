
import { useRequestStore } from "@/store/useRequestStore";

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

const MethodSelector = () => {
  const { request, updateRequest } = useRequestStore();
  return (
    <select
      value={request.method}
      onChange={e => updateRequest({ method: e.target.value })}
      className="px-2 py-1 border rounded bg-white text-black"
    >
      {methods.map(m => (
        <option key={m} value={m} className="text-black">{m}</option>
      ))}
    </select>
  );
};

export default MethodSelector;
