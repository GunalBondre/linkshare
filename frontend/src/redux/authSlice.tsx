import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
	_id: string;
	username: string;
	email: string;
	password: string;
	// Add other user properties here
}

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

// Define an async thunk for user registration
export const registerUser = createAsyncThunk(
	'auth/register',
	async (userData: { username: string; email: string; password: string }) => {
		try {
			const response = await axios.post('/auth/register', userData);
			if (response) {
				return response.data;
			}
		} catch (error) {
			console.log(error);
			throw error; // You should re-throw the error to ensure the rejection of the promise.
		}
	}
);

// Define an async thunk for user sign-in
export const signInUser = createAsyncThunk(
	'auth/signin',
	async (credentials: { email: string; password: string }) => {
		try {
			const response = await axios.post('/auth/signin', credentials);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
	return null;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logoutSuccess: (state) => {
			state.user = null;
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(signInUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signInUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(signInUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null; // Clear the user data
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string; // Handle logout error
			});
	},
});
export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
