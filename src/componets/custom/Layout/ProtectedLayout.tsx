import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../../store/store";

export default function ProtectedLayout() {
	const { user } = useSelector((state: RootState) => state.auth);

	if (!user) return <Navigate to="/login" />;

	return <Outlet />;
}
