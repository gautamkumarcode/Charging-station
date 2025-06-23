export const Button = ({ label }: { label: string }) => {
	return (
		<button className="bg-[#C8E972FD] hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded">
			{label}
		</button>
	);
};
