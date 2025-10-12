const StatusCode = ({ status }) => {
	let color = "bg-gray-200 text-gray-800";
	if (status >= 200 && status < 300) color = "bg-green-100 text-green-800";
	else if (status >= 300 && status < 400) color = "bg-yellow-100 text-yellow-800";
	else if (status >= 400 && status < 500) color = "bg-orange-100 text-orange-800";
	else if (status >= 500) color = "bg-red-100 text-red-800";
	return (
		<span className={`px-2 py-1 rounded text-xs font-bold ${color}`}>{status}</span>
	);
};

export default StatusCode;
