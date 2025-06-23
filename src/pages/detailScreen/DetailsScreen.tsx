"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Info, Loader, MapPin, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../componets/custom/Layout/Layput";
import { useAppSelector } from "../../hooks/useAppSelector";
import { formatDate, formatValue } from "../../lib/utils";

export function DetailsScreen() {
	const { dataPointId } = useParams();
	const navigate = useNavigate();
	const { dataPoints, loading } = useAppSelector((state) => state.dashboard);

	useEffect(() => {
		console.log("Fetched points:", dataPoints);
	}, [dataPoints]);

	if (loading || dataPoints.length === 0) {
		return (
			<Layout>
				<div className="flex justify-center items-center h-screen text-white">
					<Loader className="animate-spin h-8 w-8" />
				</div>
			</Layout>
		);
	}
	const dataPoint = dataPoints.find((point) => point.id === dataPointId);

	if (!dataPoint) {
		return (
			<div className=" mx-auto p-6 w-full">
				<div className="text-center py-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Data Point Not Found
					</h2>
					<p className="text-gray-600 mb-6">
						The requested data point could not be found.
					</p>
					<button onClick={() => navigate("/dashboard")}>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Dashboard
					</button>
				</div>
			</div>
		);
	}

	const relatedPoints = dataPoints
		.filter((p) => p.category === dataPoint.category && p.id !== dataPoint.id)
		.slice(0, 5);

	return (
		<Layout>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className=" mx-auto p-6 space-y-6 w-full">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<button
							className="flex justify-center items-center p-3"
							onClick={() => navigate("/dashboard")}>
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Dashboard
						</button>
						<div>
							<h1 className="text-2xl font-bold text-SecondayText">
								Data Point Details
							</h1>
							<p className="text-gray-600">
								Detailed information about {dataPoint.category} #
								{dataPoint.id.split("-")[1]}
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<div>
						<div className="flex items-center justify-between">
							<h1 className="text-xl">{dataPoint.category} Data Point</h1>
							<div className="flex items-center space-x-2">
								<span className="px-3 py-1 text-SecondayText rounded-full text-sm font-medium bg-SecondayText/10">
									{dataPoint.category}
								</span>
							</div>
						</div>
					</div>

					<div className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="text-center p-4 bg-gray-50 rounded-lg">
								<TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
								<div className="text-2xl font-bold text-gray-900">
									{formatValue(dataPoint.value)}
								</div>
								<div className="text-sm text-gray-600">Primary Value</div>
							</div>

							<div className="text-center p-4 bg-gray-50 rounded-lg">
								<MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
								<div className="text-lg font-semibold text-gray-900">
									{dataPoint.metadata.region}
								</div>
								<div className="text-sm text-gray-600">Region</div>
							</div>

							<div className="text-center p-4 bg-gray-50 rounded-lg">
								<Info className="h-8 w-8 text-purple-600 mx-auto mb-2" />
								<div className="text-lg font-semibold text-gray-900">
									{Math.round(dataPoint.metadata.confidence * 100)}%
								</div>
								<div className="text-sm text-gray-600">Confidence</div>
							</div>
						</div>

						{/* Detailed Information */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-lg font-semibold text-SecondayText mb-3">
									Basic Information
								</h3>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">ID:</span>
										<span className="font-medium">{dataPoint.id}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Category:</span>
										<span className="font-medium">{dataPoint.category}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Source:</span>
										<span className="font-medium">
											{dataPoint.metadata.source}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Created:</span>
										<span className="font-medium">
											{formatDate(dataPoint.timestamp)}
										</span>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									Coordinates & Metrics
								</h3>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">X Position:</span>
										<span className="font-medium">
											{dataPoint.x.toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Y Position:</span>
										<span className="font-medium">
											{dataPoint.y.toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Value:</span>
										<span className="font-medium">
											{formatValue(dataPoint.value)}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Confidence Score:</span>
										<span className="font-medium">
											{(dataPoint.metadata.confidence * 100).toFixed(1)}%
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{relatedPoints.length > 0 && (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col   gap-2">
							<h1>Related Data Points</h1>
							<p className="text-sm text-gray-600">
								Other data points in the {dataPoint.category} category
							</p>
						</div>

						<div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{relatedPoints.map((point) => (
									<motion.div
										key={point.id}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="p-4 border border-borderColor rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all bg-bgGray "
										onClick={() => navigate(`/details/${point.id}`)}>
										<div className="flex items-center justify-between mb-2">
											<span className="font-medium text-SecondayText">
												#{point.id.split("-")[1]}
											</span>
											<span className="text-sm text-gray-500">
												{point.metadata.region}
											</span>
										</div>
										<div className="text-lg font-semibold text-blue-600">
											{formatValue(point.value)}
										</div>
										<div className="text-xs text-gray-500 mt-1">
											{formatDate(point.timestamp)}
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				)}
			</motion.div>
		</Layout>
	);
}
