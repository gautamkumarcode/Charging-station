"use client";

import { motion } from "framer-motion";
import { formatDate, formatValue } from "../../lib/utils";
import type { DataPoint } from "../../store/slices/dashboardSlice";

interface DataPointTooltipProps {
	dataPoint: DataPoint;
	mousePosition: { x: number; y: number };
}

export function DataPointTooltip({
	dataPoint,
	mousePosition,
}: DataPointTooltipProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{ duration: 0.2 }}
			className="absolute z-50 pointer-events-none"
			style={{
				left: mousePosition.x + 10,
				top: mousePosition.y - 10,
				transform: "translateY(-100%)",
			}}>
			<div className="bg-white text-black rounded-lg shadow-lg border border-gray-200 p-4 w-72">
				<div className="flex items-center justify-between mb-2">
					<span className="font-medium text-gray-900">
						{dataPoint.category}
					</span>
					<span className="text-sm text-gray-500">
						#{dataPoint.id.split("-")[1]}
					</span>
				</div>

				<div className="grid grid-cols-2 gap-2 text-sm mb-2">
					<div>
						<span className="text-gray-500">Value:</span>
						<span className="ml-1 font-medium">
							{formatValue(dataPoint.value)}
						</span>
					</div>
					<div>
						<span className="text-gray-500">Region:</span>
						<span className="ml-1 font-medium">
							{dataPoint.metadata.region}
						</span>
					</div>
					<div>
						<span className="text-gray-500">Source:</span>
						<span className="ml-1 font-medium">
							{dataPoint.metadata.source}
						</span>
					</div>
					<div>
						<span className="text-gray-500">Confidence:</span>
						<span className="ml-1 font-medium">
							{Math.round(dataPoint.metadata.confidence * 100)}%
						</span>
					</div>
				</div>

				<div className="text-xs text-gray-500 pt-2 border-t">
					{formatDate(dataPoint.timestamp)}
				</div>
			</div>
		</motion.div>
	);
}
