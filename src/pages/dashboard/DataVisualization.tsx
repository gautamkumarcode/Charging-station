"use client";

import { AnimatePresence } from "framer-motion";
import type React from "react";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
	setHoveredDataPoint,
	setSelectedDataPoint,
} from "../../store/slices/dashboardSlice";
import { DataPointTooltip } from "./DataPointTooltip";

export function DataVisualization() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const { filteredDataPoints, hoveredDataPoint, variables } = useAppSelector(
		(state) => state.dashboard
	);
	const dispatch = useAppDispatch();

	const showConfidence =
		variables.find((v) => v.id === "show-confidence")?.value || false;

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas size
		const rect = container.getBoundingClientRect();
		canvas.width = rect.width * window.devicePixelRatio;
		canvas.height = rect.height * window.devicePixelRatio;
		ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

		const width = rect.width;
		const height = rect.height;

		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		// Draw grid
		ctx.strokeStyle = "#f3f4f6";
		ctx.lineWidth = 1;

		// Vertical grid lines
		for (let i = 0; i <= 10; i++) {
			const x = (width / 10) * i;
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.stroke();
		}

		// Horizontal grid lines
		for (let i = 0; i <= 10; i++) {
			const y = (height / 10) * i;
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
			ctx.stroke();
		}

		// Draw data points
		filteredDataPoints.forEach((point) => {
			const x = (point.x / 100) * width;
			const y = height - (point.y / 100) * height;
			const radius = Math.max(4, Math.min(12, point.value / 100));

			// Point color based on category
			const colors = {
				Sales: "#3b82f6",
				Marketing: "#10b981",
				Engineering: "#f59e0b",
				Support: "#ef4444",
			};

			ctx.fillStyle =
				colors[point.category as keyof typeof colors] || "#6b7280";

			// Add confidence ring if enabled
			if (showConfidence) {
				ctx.strokeStyle = ctx.fillStyle;
				ctx.lineWidth = 2;
				ctx.globalAlpha = point.metadata.confidence;
				ctx.beginPath();
				ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
				ctx.stroke();
				ctx.globalAlpha = 1;
			}

			// Draw main point
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			ctx.fill();

			// Highlight hovered point
			if (hoveredDataPoint?.id === point.id) {
				ctx.strokeStyle = "#1f2937";
				ctx.lineWidth = 3;
				ctx.beginPath();
				ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
				ctx.stroke();
			}
		});
	}, [filteredDataPoints, hoveredDataPoint, showConfidence]);

	const handleMouseMove = (event: React.MouseEvent) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;

		// Find closest data point
		let closestPoint = null;
		let minDistance = Number.POSITIVE_INFINITY;

		filteredDataPoints.forEach((point) => {
			const x = (point.x / 100) * rect.width;
			const y = rect.height - (point.y / 100) * rect.height;
			const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
			const radius = Math.max(4, Math.min(12, point.value / 100));

			if (distance <= radius + 5 && distance < minDistance) {
				closestPoint = point;
				minDistance = distance;
			}
		});

		dispatch(setHoveredDataPoint(closestPoint));
	};

	const handleMouseLeave = () => {
		dispatch(setHoveredDataPoint(null));
	};

	const handleClick = (event: React.MouseEvent) => {
		if (hoveredDataPoint) {
			dispatch(setSelectedDataPoint(hoveredDataPoint));
		}
	};

	return (
		<div className="relative w-full h-full">
			<div
				ref={containerRef}
				className="w-full h-full cursor-crosshair bg-cardColor"
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}>
				<canvas
					ref={canvasRef}
					className="w-full h-full"
					style={{ width: "100%", height: "100%" }}
				/>
			</div>

			<AnimatePresence>
				{hoveredDataPoint && (
					<DataPointTooltip
						dataPoint={hoveredDataPoint}
						mousePosition={{
							x:
								(hoveredDataPoint.x / 100) *
								(containerRef.current?.clientWidth || 0),
							y:
								(containerRef.current?.clientHeight || 0) -
								(hoveredDataPoint.y / 100) *
									(containerRef.current?.clientHeight || 0),
						}}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
