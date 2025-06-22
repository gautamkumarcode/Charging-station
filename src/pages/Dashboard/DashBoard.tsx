import Layput from "../../componets/custom/Layout/Layput";

type Props = {};

const DashBoard = (props: Props) => {
	return (
		<Layput>
			<div className="flex flex-col items-center justify-center h-full bg-secondaryBg p-6">
				<h1 className="text-2xl font-bold text-white">
					Welcome to the Dashboard
				</h1>
				<p className="text-gray-400 mt-2">
					This is your dashboard where you can manage your settings and view
					analytics.
				</p>
			</div>
		</Layput>
	);
};

export default DashBoard;
