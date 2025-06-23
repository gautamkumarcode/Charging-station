"use client";

import { motion } from "framer-motion";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
	setSelectedVariable,
	toggleVariablesPanel,
} from "../../store/slices/dashboardSlice";

import { ArrowLeft, Info, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../../componets/custom/Layout/Layput";

export function VariablesPanel() {
	const navigate = useNavigate();
	const { variables, selectedVariableId } = useAppSelector(
		(state) => state.dashboard
	);
	const dispatch = useAppDispatch();

	const activeVariables = variables.filter((v) => v.active);

	const handleEditVariables = () => {
		dispatch(toggleVariablesPanel());
	};

	const handleVariableSelect = (variableId: string) => {
		dispatch(
			setSelectedVariable(selectedVariableId === variableId ? null : variableId)
		);
	};

	return (
		<Layout>
			<div className="h-full p-5 space-y-6">
				<div className="flex flex-row items-center justify-between space-y-0 pb-4">
					<div className="flex gap-3 items-center">
						<ArrowLeft onClick={() => navigate("/dashboard")} />{" "}
						<h1 className="text-lg">Variables Panel</h1>
					</div>
					<button
						onClick={handleEditVariables}
						className="flex items-center space-x-2">
						<Settings className="h-4 w-4" />
						<span>Edit Variables</span>
					</button>
				</div>

				<div className="space-y-3">
					<div className="text-sm text-gray-600 mb-4">
						Active variables affecting the visualization:
					</div>

					{activeVariables.map((variable) => (
						<motion.div
							key={variable.id}
							className={`p-3 rounded-lg border cursor-pointer transition-all bg-bgGray text-white ${
								selectedVariableId === variable.id
									? "border-SecondayText "
									: "border-borderColor "
							}`}
							onClick={() => handleVariableSelect(variable.id)}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							<div className="flex items-center justify-between mb-2">
								<span className="font-medium ">{variable.name}</span>
								<Info className="h-4 w-4 text-gray-400" />
							</div>

							<div className="text-sm  mb-2">
								Current:{" "}
								<span className="font-medium">{String(variable.value)}</span>
							</div>

							{selectedVariableId === variable.id && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									className="text-xs text-gray-500 pt-2 border-t">
									{variable.description}
								</motion.div>
							)}
						</motion.div>
					))}

					{activeVariables.length === 0 && (
						<div className="text-center text-gray-500 py-8">
							No active variables. Click "Edit Variables" to configure.
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}
