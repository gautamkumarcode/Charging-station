import { Search } from "lucide-react";

export const Navbar = () => {
	const tabs = ["Charging Stations", "Fleet Sizing", "Parking"];

	return (
		<div className="bg-bgBlack px-6 py-3 flex items-center justify-between border-b border-gray-700">
			<div className="flex items-center space-x-6">
				<button className="text-gray-400">
					<div className="w-4 h-0.5 bg-current mb-1"></div>
					<div className="w-4 h-0.5 bg-current mb-1"></div>
					<div className="w-4 h-0.5 bg-current"></div>
				</button>

				<div className="flex space-x-1">
					{tabs.map((tab, index) => (
						<button
							key={tab}
							className={`px-4 py-2 text-sm ${
								index === 0
									? "bg-bgGray text-white rounded-md"
									: "text-gray-400 hover:text-white"
							}`}>
							{tab}
						</button>
					))}
				</div>
			</div>

			<div className="relative overflow-hidden p-1 rounded-lg">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
				<input
					type="text"
					placeholder="Search"
					className="pl-10 w-64 bg-bgGray border-gray-600 text-white placeholder-gray-400 rounnded-md focus:outline-none focus:ring-2 focus:ring-SecondayText focus:border-transparent transition-colors duration-200 text-sm p-2"
				/>
			</div>
		</div>
	);
};
