import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import {
	GoogleAuthProvider,
	signOut as firebaseSignOut,
	signInWithEmailAndPassword,
	signInWithPopup,
	type User,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
};

// Async thunks
export const signIn = createAsyncThunk(
	"auth/signIn",
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			return result.user;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const signInWithGoogle = createAsyncThunk(
	"auth/signInWithGoogle",
	async (_, { rejectWithValue }) => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			return result.user;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const signOut = createAsyncThunk(
	"auth/signOut",
	async (_, { rejectWithValue }) => {
		try {
			await firebaseSignOut(auth);
			return null;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.loading = false;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
		// Add this new action to handle auth state initialization
		initializeAuth: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// Sign In
			.addCase(signIn.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(signIn.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// Sign In with Google
			.addCase(signInWithGoogle.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signInWithGoogle.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(signInWithGoogle.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// Sign Out
			.addCase(signOut.fulfilled, (state) => {
				state.user = null;
				state.loading = false;
				state.error = null;
			})
			.addCase(signOut.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	},
});

export const { setUser, setLoading, clearError, initializeAuth } =
	authSlice.actions;

export default authSlice.reducer;
