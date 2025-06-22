import { Bell, Car, HelpCircle, Home, Settings, Users } from "lucide-react";

export function Sidebar() {
	const navigationItems = [
		{ icon: Home, active: true },
		{ icon: Bell, active: false },
		{ icon: Car, active: false },
		{ icon: Users, active: false },
		{ icon: Settings, active: false },
		{ icon: HelpCircle, active: false },
	];

	return (
		<div className="w-16 bg-bgBlack flex flex-col items-center py-4 space-y-4">
			{navigationItems.map((item, index) => (
				<button
					key={index}
					className={`w-8 h-8 justify-center items-center flex ${
						item.active
							? "bg-bgGray text-white rounded-md"
							: "text-gray-400 hover:text-white hover:bg-bgGray transition-colors duration-200 hover:rounded-md"
					}`}>
					<item.icon className="w-4 h-4" />
				</button>
			))}
		</div>
	);
}
