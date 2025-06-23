import { useAppSelector } from "../../../hooks/useAppSelector";
import VariableEditorPanel from "../../../pages/dashboard/VariableEditingSlideOver";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Siderbar";

type Props = {
	children: React.ReactNode;
};

const Layout = (props: Props) => {
	const { isVariablesPanelOpen } = useAppSelector((state) => state.dashboard);

	return (
		<div className="flex flex-col h-screen bg-bgBlack text-white">
			<Navbar />
			<div className="flex ">
				{isVariablesPanelOpen && <VariableEditorPanel />}
				<Sidebar />

				<div className="flex flex-col h-[90vh] overflow-y-scroll bg-secondaryBg w-full overflow-hidden">
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
