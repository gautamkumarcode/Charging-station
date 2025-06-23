import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./componets/auth/AuthProvider";
import { DashboardScreen } from "./pages/dashboard/DashboardScreen";
import { VariablesPanel } from "./pages/dashboard/VariablesPanel";
import { DetailsScreen } from "./pages/detailScreen/DetailsScreen";
import { LoginScreen } from "./pages/login/LoginScreen";
import type { RootState } from "./store/store";

function App() {
	const { user, loading } = useSelector((state: RootState) => state.auth);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen text-white">
				<Loader className="animate-spin h-8 w-8" />
			</div>
		);
	}

	return (
		<AuthProvider>
			<Routes>
				<Route
					path="/login"
					element={!user ? <LoginScreen /> : <Navigate to="/dashboard" />}
				/>
				<Route
					path="/dashboard"
					element={user ? <DashboardScreen /> : <Navigate to="/login" />}
				/>
				<Route
					path="/details/:dataPointId"
					element={user ? <DetailsScreen /> : <Navigate to="/login" />}
				/>
				<Route
					path="/"
					element={<Navigate to={user ? "/dashboard" : "/login"} />}
				/>
				<Route path="/variables" element={<VariablesPanel />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
