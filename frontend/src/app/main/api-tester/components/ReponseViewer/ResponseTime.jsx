const ResponseTime = ({ time }) => (
	<span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 font-mono">
		{typeof time === "number" ? `${time} ms` : "-"}
	</span>
);

export default ResponseTime;
