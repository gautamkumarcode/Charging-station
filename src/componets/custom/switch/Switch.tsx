export const Switch = ({
	checked,
	onChange,
}: {
	checked: boolean;
	onChange: () => void;
}) => {
	return (
		<button
			onClick={onChange}
			className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
				checked ? "bg-green-500" : "bg-gray-500"
			}`}>
			<div
				className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
					checked ? "translate-x-5" : "translate-x-0"
				}`}></div>
		</button>
	);
};
