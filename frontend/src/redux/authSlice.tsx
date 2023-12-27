import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	token: string | null;
	subscription: {
		status: 'active' | 'inactive';
		plan: 'free' | 'paid' | 'premium';
		expiresAt: string | null; // Assuming it's a string representing a date
		// Add other properties related to the subscription
	};
}

interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
	token: string | null;
}

const getTokenFromLocalStorage = () => {
	return localStorage.getItem('token');
};

const setTokenInLocalStorage = (token: string | null) => {
	if (token) {
		return localStorage.setItem('token', token);
	} else {
		return localStorage.removeItem('token');
	}
};

export const setUserInLocalStorage = (user: User | null) => {
	if (user) {
		localStorage.setItem('user', JSON.stringify(user));
	} else {
		localStorage.removeItem('user');
	}
};

const getUserFromLocalstorage = () => {
	const userJSON = localStorage.getItem('user');
	if (userJSON) {
		return JSON.parse(userJSON) as User;
	}
	return null;
};
const initialState: AuthState = {
	user: getUserFromLocalstorage(),
	loading: false,
	error: null,
	token: getTokenFromLocalStorage(),
};

// Define an async thunk for user registration
export const registerUser = createAsyncThunk<
	User,
	{ username: string; email: string; password: string }
>(
	'auth/register',
	async (userData: { username: string; email: string; password: string }) => {
		try {
			const response = await axios.post('/auth/register', userData);
			if (response) {
				toast.success('Registration successfull');
				return response.data;
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data);
			}
			throw error; // You should re-throw the error to ensure the rejection of the promise.
		}
	}
);

// Define an async thunk for user sign-in
export const signInUser = createAsyncThunk<
	User,
	{ email: string; password: string }
>(
	'auth/signin',
	async (
		credentials: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.post('/auth/signin', credentials);
			return response.data as User;
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data);
			}
			return rejectWithValue(error);
		}
	}
);

export const getUser = createAsyncThunk(
	'auth/getUser',
	async (email: string) => {
		const response = await axios.get(`/auth/getUser?email=${email}`);
		return response.data as User;
	}
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
	return null;
});

export const resetPassword = createAsyncThunk<
	User,
	{ password: string; token: string }
>(
	'auth/resetPassword',
	async (credentials: { password: string; token: string }) => {
		const url = `/auth/resetPassword`;
		const response = await axios.post(url, { data: credentials });
		if (response.data) {
			toast.success(response?.data?.message);
		} else {
			toast.error(response?.data?.message);
		}
		return response.data as User;
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logoutSuccess: (state) => {
			state.user = null;
			state.loading = false;
			state.error = null;
			localStorage.removeItem('token');
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
				state.token = action.payload.token;
				state.user.subscription = action.payload.subscription;
				setTokenInLocalStorage(action.payload.token); // Store the token in local storage
				setUserInLocalStorage(action.payload); // Save user data in local storage
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
				state.token = null;
				setTokenInLocalStorage(null);
				setUserInLocalStorage(null); // Save user data in local storage
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string; // Handle logout error
			})
			.addCase(getUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state) => {
				state.user = null; // Clear the user data
				state.token = null;
				setTokenInLocalStorage(null);
				setUserInLocalStorage(null); // Save user data in local storage
			});
	},
});
export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
