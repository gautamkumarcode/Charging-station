"use client";

import { onAuthStateChanged } from "firebase/auth";
import type React from "react";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { auth } from "../../lib/firebase";
import { clearError, initializeAuth } from "../../store/slices/authSlice";

interface AuthProviderProps {
	children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		// Clear any auth errors on mount
		dispatch(clearError());

		// Listen to auth state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			// Use initializeAuth instead of setUser to properly handle loading state
			dispatch(initializeAuth(user));
		});

		return () => unsubscribe();
	}, [dispatch]);

	return <>{children}</>;
}
