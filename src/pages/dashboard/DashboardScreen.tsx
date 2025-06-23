"use client";

import { useEffect, useState } from "react";

import {
	ChevronDown,
	ChevronUp,
	CircleQuestionMark,
	Edit,
	Ellipsis,
	Plus,
	RefreshCw,
	Upload,
} from "lucide-react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Layout from "../../componets/custom/Layout/Layput";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
	loadDataPoints,
	toggleVariablesPanel,
} from "../../store/slices/dashboardSlice";
import VariableEditorPanel from "./VariableEditingSlideOver";

export function DashboardScreen() {
	const { filteredDataPoints, variables, loading, isVariablesPanelOpen } =
		useAppSelector((state) => state.dashboard);
	const [showSlideOver, setShowSlideOver] = useState<boolean>(false);
	const [showBestScenario, setShowBestScenario] = useState<boolean>(true);

	const dispatch = useAppDispatch();

	useEffect(() => {
		// Load data points on component mount
		dispatch(loadDataPoints());
	}, [dispatch]);

	const chartData = [
		{ month: "Apr", value: 20000 },
		{ month: "May", value: 10000 },
		{ month: "Jun", value: 60000 },
		{ month: "Jul", value: 90000 },
		{ month: "Aug", value: 10000 },
		{ month: "Sep", value: 100000 },
		{ month: "Oct", value: 45000 },
	];

	const kpiCards = [
		{
			title: "Infrastructure Units",
			value: "€421.07",
			description: "This describes variable two and what the shown data means.",
		},
		{
			title: "Charging Growth",
			value: "33.07",
			description: "This describes variable two and what the shown data means.",
		},
		{
			title: "Localization change",
			value: "21.9%",
			description: "This describes variable two and what the shown data means.",
		},
		{
			title: "Fleet growth",
			value: "7.03%",
			description: "This describes variable two and what the shown data means.",
		},
	];

	if (loading) {
		return (
			<div className="mx-auto p-6 flex items-center justify-center h-96">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	return (
		<Layout>
			{isVariablesPanelOpen && <VariableEditorPanel />}
			<div className=" bg-secondaryBg text-white p-6 space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold">⚡ Charging Station</h1>
					<div className="flex items-center space-x-2">
						<button className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700">
							<RefreshCw size={16} />
						</button>
						<button
							className="bg-gray-800 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-700"
							onClick={() => dispatch(toggleVariablesPanel())}>
							<Edit size={16} />
							<span className="text-sm">Edit Variables</span>
						</button>
						<button className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700">
							<Upload size={16} />
						</button>
					</div>
				</div>

				{/* Best Scenario Results */}
				<div className=" rounded-lg p-4 space-y-3 text-SecondayText">
					<div className="flex items-center justify-between">
						<h2 className="font-semibold text-[#DCFF7FFD]">
							{" "}
							Best Scenario Results
						</h2>
						<button className="border-SecondayText rounded-full border p-1 hover:bg-SecondayText/10 hover:text-white transition-colors w-12 h-8 flex items-center justify-center">
							{showBestScenario ? (
								<ChevronUp onClick={() => setShowBestScenario(false)} />
							) : (
								<ChevronDown onClick={() => setShowBestScenario(true)} />
							)}
						</button>
					</div>
					{showBestScenario && (
						<div className="space-y-3">
							{" "}
							<div className="bg-transparent border border-SecondayText  p-3 rounded text-sm flex justify-between">
								<h2>
									{" "}
									The best found configuration based on profit is characterized
									by 11 zones (max) with charging stations and 48 total number
									of poles.
								</h2>
								<Ellipsis />
							</div>
							<div className="bg-transparent border border-SecondayText  p-3 rounded text-sm flex justify-between">
								<p>
									The best found configuration based on satisfied demand is
									characterized by 11 zones (max) with charging stations and 48
									total number of poles.
								</p>
								<Ellipsis />
							</div>
						</div>
					)}
				</div>

				{/* Graphs + KPIs */}
				<div className="w-full gap-6 flex">
					{/* Graph */}
					<div className=" w-[60%] p-4">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold">Graphs</h3>
						</div>
						<div className="h-96 bg-bgGray flex flex-col items-center justify-center rounded-lg p-6 space-y-4 border-borderColor">
							<div className="flex w-full justify-end  mt-4">
								<select className=" flex justify-self-end  bg-[#222] text-white px-2 py-1 rounded border border-gray-600 text-sm">
									<option>Unsatisfied Demand %</option>
								</select>
							</div>
							<ResponsiveContainer width="100%" height="100%">
								<LineChart
									data={chartData}
									margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
									<CartesianGrid strokeDasharray="3 3" stroke="#333" />
									<XAxis dataKey="month" stroke="#888" />
									<YAxis stroke="#888" />
									<Tooltip
										contentStyle={{
											backgroundColor: "#1a1a1a",
											borderColor: "#333",
										}}
									/>
									<Line
										type="linear"
										dataKey="value"
										stroke="#DCFF7FFD"
										strokeWidth={2}
										dot={{ r: 4 }}
										activeDot={{ r: 6 }}
										animationDuration={500}
										animationEasing="ease-in-out"
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* KPIs */}
					<div className="w-[40%] space-y-4 p-4">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold">
								Key Performance Indicators
							</h3>
							<button className="border border-borderColor rounded-md p-2 hover:bg-borderColor hover:text-white transition-colors ">
								Variable <Plus size={16} className="inline-block ml-2" />
							</button>
						</div>
						<div className="gap-4 flex flex-wrap">
							{kpiCards.map((card, idx) => (
								<div
									key={idx}
									className="border border-borderColor rounded-lg p-4 space-y-4 w-[45%] hover:bg-gray-800 transition-colors h-40">
									<div className="text-sm font-semibold flex items-center justify-between">
										{card.title}{" "}
										<CircleQuestionMark size={15} className="text-gray-500" />
									</div>
									<p className="text-xs text-gray-400">{card.description}</p>
									<div className="text-2xl font-bold w-full flex items-end justify-end">
										{card.value}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Slide Over Panel */}
				{/* {showSlideOver && (
					<div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
						<div className="w-full max-w-md bg-[#111] text-white p-6 h-full shadow-xl overflow-y-auto">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold">Edit Variables</h2>
								<button
									onClick={() => setShowSlideOver(false)}
									className="text-gray-400 hover:text-white">
									✕
								</button>
							</div>
							<form className="space-y-4">
								<div>
									<label className="text-sm text-gray-400">Variable Name</label>
									<input
										type="text"
										className="mt-1 w-full px-3 py-2 bg-[#222] border border-gray-600 rounded"
									/>
								</div>
								<div>
									<label className="text-sm text-gray-400">Value</label>
									<input
										type="number"
										className="mt-1 w-full px-3 py-2 bg-[#222] border border-gray-600 rounded"
									/>
								</div>
								<div className="pt-4">
									<button
										type="submit"
										className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
										Save Changes
									</button>
								</div>
							</form>
						</div>
					</div>
				)} */}
			</div>
		</Layout>
	);
}
