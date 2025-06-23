import { Check, ChevronDown, CircleAlert, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleVariablesPanel } from "../../store/slices/dashboardSlice";

const categories = [
	{
		name: "Variable Category 1",
		variables: ["Carbon 1", "Co2 Distribution", "Fleet sizing"],
	},
	{
		name: "Variable Category 2",
		variables: ["Parking Rate", "Border Rate", "Request rate"],
	},
	{
		name: "Variable Category 3",
		variables: ["Variable 1", "Variable 1", "Variable 1"],
	},
];

function Tag({
	label,
	active,
	onClick,
}: {
	label: string;
	active: boolean;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm border transition-colors duration-200
        ${
					active
						? "bg-SecondayText/20 border-[#C9FF3B] text-SecondayText hover:bg-SecondayText/30"
						: "bg-gray-800 border-gray-500 text-gray-300 hover:bg-gray-700"
				}`}>
			{label}
			{active ? <Check size={14} /> : <Plus size={14} />}
		</button>
	);
}

function Input({ placeholder }: { placeholder: string }) {
	return (
		<input
			type="text"
			placeholder={placeholder}
			className="w-full bg-[#111] text-white border border-gray-700 px-3 py-2 rounded"
		/>
	);
}

function Button({ label }: { label: string }) {
	return (
		<button className="bg-SecondayText/20 hover:bg-SecondayText/30 text-SecondayText font-semibold px-4 py-2 rounded border border-SecondayText transition-colors duration-200">
			{label}
		</button>
	);
}

function Switch({
	checked,
	onChange,
}: {
	checked: boolean;
	onChange: () => void;
}) {
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
}

export default function VariableEditorPanel() {
	const [search, setSearch] = useState("");
	const [selectedVars, setSelectedVars] = useState(
		categories.map((cat) => cat.variables.map(() => true))
	);
	const [isCo2Active, setIsCo2Active] = useState<boolean>(true);
	const dispatch = useDispatch();
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		requestAnimationFrame(() => {
			if (panelRef.current) {
				panelRef.current.classList.remove("translate-x-full");
				panelRef.current.classList.add("translate-x-0");
			}
		});
	}, []);

	const toggleVariable = (catIndex: number, varIndex: number) => {
		setSelectedVars((prev) =>
			prev.map((vars, i) =>
				i === catIndex ? vars.map((v, j) => (j === varIndex ? !v : v)) : vars
			)
		);
	};

	return (
		<div className="fixed inset-0 z-50">
			<div
				className="absolute inset-0 bg-black/60"
				onClick={() => dispatch(toggleVariablesPanel())}></div>
			<div
				ref={panelRef}
				className="absolute right-0 top-0 h-full w-full max-w-xl bg-[#0c0c0c] text-white p-8 shadow-lg border-l border-borderColor transform transition-transform duration-500 translate-x-full overflow-y-auto">
				<button
					className="absolute top-4 right-4 text-gray-400 hover:text-white"
					onClick={() => dispatch(toggleVariablesPanel())}>
					<X />
				</button>

				<h2 className="text-xl font-semibold mb-4">Variable Editor</h2>

				<div className="flex items-center justify-between mb-4">
					<Input placeholder="Search..." />
					<div className="flex items-center space-x-2 ml-4">
						<input type="checkbox" className="accent-yellow-400" />
						<label className="text-sm text-gray-400">Autofill</label>
						<Button label="Rerun" />
					</div>
				</div>

				<div className="space-y-4  p-4 bg-[#161618] rounded-sm border-borderColor ">
					{categories.map((category, catIndex) => (
						<div key={category.name} className="mb-4">
							<h3 className="text-sm text-gray-400 mb-1">{category.name}</h3>
							<div className="flex flex-wrap gap-2">
								{category.variables.map((label, varIndex) => (
									<Tag
										key={varIndex}
										label={label}
										active={selectedVars[catIndex][varIndex]}
										onClick={() => toggleVariable(catIndex, varIndex)}
									/>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="bg-[#222324] border border-borderColor p-4 rounded text-sm text-gray-300">
					<div className="flex items-center mb-2 gap-4">
						<span className=" font-medium">Co2 Distribution</span>
						<CircleAlert size={15} />
					</div>
					<p>
						But what truly sets Switch apart is its versatility. It can be used
						as a scooter, a bike, or even a skateboard, making it suitable for
						people of all ages. Whether you’re a student, a professional, or a
						senior citizen, Switch adapts to your needs and lifestyle.
					</p>
				</div>

				<div className="mt-4  pt-4">
					<button className="w-full flex justify-between items-center px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] border border-SecondayText rounded text-SecondayText">
						Primary Variables
						<ChevronDown size={18} />
					</button>
				</div>

				<div className="mt-2">
					<button className="w-full flex justify-between items-center px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] border border-SecondayText rounded text-SecondayText">
						Secondary Variables
						<ChevronDown size={18} />
					</button>
				</div>
			</div>
		</div>
	);
}
