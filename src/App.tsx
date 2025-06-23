import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./componets/auth/AuthProvider";
import { DashboardScreen } from "./pages/dashboard/DashboardScreen";
import { DetailsScreen } from "./pages/detailScreen/DetailsScreen";
import { LoginScreen } from "./pages/login/LoginScreen";
import type { RootState } from "./store/store";

function App() {
	const { user, loading } = useSelector((state: RootState) => state.auth);

	// if (loading) {
	// 	return (
	// 		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
	// 			<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
	// 		</div>
	// 	);
	// }

	return (
		<AuthProvider>
			<Routes>
				<Route
					path="/login"
					element={!user ? <LoginScreen /> : <Navigate to="/dashboard" />}
				/>
				<Route
					path="/"
					element={user ? <DashboardScreen /> : <Navigate to="/login" />}>
					<Route index element={<Navigate to="/dashboard" />} />
					<Route path="/dashboard" element={<DashboardScreen />} />
					<Route path="/details/:dataPointId" element={<DetailsScreen />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
