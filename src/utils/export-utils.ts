import jsPDF from "jspdf";

export interface KPIData {
	title: string;
	value: string;
	description: string;
}

export interface ChartData {
	month: string;
	value: number;
}

// CSV Export Functions
export function exportKPIToCSV(kpiData: KPIData[], filename = "kpi-data.csv") {
	const headers = ["Metric", "Value", "Description"];
	const csvContent = [
		headers.join(","),
		...kpiData.map((kpi) =>
			[`"${kpi.title}"`, `"${kpi.value}"`, `"${kpi.description}"`].join(",")
		),
	].join("\n");

	downloadFile(csvContent, filename, "text/csv");
}

export function exportChartToCSV(
	chartData: ChartData[],
	filename = "chart-data.csv"
) {
	const headers = ["Month", "Value"];
	const csvContent = [
		headers.join(","),
		...chartData.map((data) => [data.month, data.value].join(",")),
	].join("\n");

	downloadFile(csvContent, filename, "text/csv");
}

// PDF Export Functions
export function exportKPIToPDF(
	kpiData: KPIData[],
	filename = "kpi-report.pdf"
) {
	const doc = new jsPDF();

	// Add title
	doc.setFontSize(20);
	doc.text("Key Performance Indicators Report", 20, 30);

	// Add date
	doc.setFontSize(12);
	doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);

	let yPosition = 65;

	kpiData.forEach((kpi, index) => {
		if (yPosition > 250) {
			doc.addPage();
			yPosition = 30;
		}

		// KPI Title
		doc.setFontSize(14);
		doc.setFont("", "bold");
		doc.text(kpi.title, 20, yPosition);

		// KPI Value
		doc.setFontSize(16);
		doc.setTextColor(0, 150, 0); // Green color
		doc.text(kpi.value, 20, yPosition + 10);

		// KPI Description
		doc.setFontSize(10);
		doc.setTextColor(0, 0, 0); // Black color
		doc.setFont("", "normal");
		const splitDescription = doc.splitTextToSize(kpi.description, 170);
		doc.text(splitDescription, 20, yPosition + 20);

		yPosition += 45;
	});

	doc.save(filename);
}

export function exportChartToPDF(
	chartData: ChartData[],
	canvasElement: HTMLCanvasElement | null,
	filename = "chart-report.pdf"
) {
	const doc = new jsPDF();

	// Add title
	doc.setFontSize(20);
	doc.text("Chart Data Report", 20, 30);

	// Add date
	doc.setFontSize(12);
	doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);

	// Add chart image if canvas is available
	if (canvasElement) {
		try {
			const imgData = canvasElement.toDataURL("image/png");
			doc.addImage(imgData, "PNG", 20, 60, 170, 80);
		} catch (error) {
			console.warn("Could not export chart image:", error);
		}
	}

	// Add data table
	doc.setFontSize(14);
	doc.text("Data Table", 20, 160);

	let yPosition = 175;
	doc.setFontSize(10);
	doc.text("Month", 20, yPosition);
	doc.text("Value", 80, yPosition);

	yPosition += 10;
	chartData.forEach((data) => {
		if (yPosition > 270) {
			doc.addPage();
			yPosition = 30;
		}
		doc.text(data.month, 20, yPosition);
		doc.text(data.value.toString(), 80, yPosition);
		yPosition += 8;
	});

	doc.save(filename);
}

// Helper function to download files
function downloadFile(content: string, filename: string, mimeType: string) {
	const blob = new Blob([content], { type: mimeType });
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	window.URL.revokeObjectURL(url);
}
