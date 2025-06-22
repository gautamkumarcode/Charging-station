import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Siderbar";

type Props = {
	children: React.ReactNode;
};

const Layput = (props: Props) => {
	return (
		<div className="flex flex-col h-screen bg-bgBlack text-white">
			<Navbar />
			<div className="flex h-screen">
				<Sidebar />

				<div className="flex flex-col bg-secondaryBg w-full">
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Layput;
