import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Siderbar";

type Props = {
	children: React.ReactNode;
};

const Layout = (props: Props) => {
	return (
		<div className="flex flex-col h-screen bg-bgBlack text-white">
			<Navbar />
			<div className="flex ">
				<Sidebar />

				<div className="flex flex-col h-[90vh] overflow-y-scroll bg-secondaryBg w-full overflow-hidden">
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
