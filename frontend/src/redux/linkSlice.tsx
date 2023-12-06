import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Link {
	id: string;
	link: string;
	title: string;
}

interface LinkState {
	collection: Link[];
	loading: boolean;
	error: string | null;
}

// To retrieve the stored item in your code
// const storedData = localStorage.getItem('links');
// let initialCollection = storedData ? JSON.parse(storedData) : [];
// if (!Array.isArray(initialCollection)) {
// 	initialCollection = [];
// }
const initialState: LinkState = {
	collection: [],
	loading: false,
	error: null,
};

export const createLink = createAsyncThunk(
	'links/create',
	async (linkData: { title: string; link: string; id: string }) => {
		// const currentState = getState() as { links: LinkState };

		try {
			const response = await axios.post('/link/add', linkData);
			// const updatedCollection = [
			// 	...currentState.links.collection,
			// 	response.data,
			// ];

			// localStorage.setItem('links', JSON.stringify(updatedCollection));
			if (response) {
				toast.success('link added successfully');
				return response.data;
			}
		} catch (error) {
			console.log(error);
		}
	}
);

export const getAllLinks = createAsyncThunk(
	'links/getAll',
	async (id: string) => {
		try {
			const response = await axios.get(`/link/links/${id}`);
			if (response) {
				return response.data;
			}
		} catch (error) {
			console.log(error);
		}
	}
);

export const deleteLink = createAsyncThunk(
	'links/delete',
	async (linkid: string) => {
		try {
			await axios.delete(`/link/links/${linkid}`);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	}
);

const linkSlice = createSlice({
	name: 'links',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createLink.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createLink.fulfilled, (state, action: PayloadAction<Link>) => {
				state.loading = false;
				state.collection.push(action.payload);
				// localStorage.setItem('links', JSON.stringify(state.collection)); // Store the entire collection
			})
			.addCase(createLink.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(getAllLinks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllLinks.fulfilled, (state, action) => {
				state.loading = false;
				state.collection = action.payload;
			})
			.addCase(deleteLink.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteLink.fulfilled, (state, action) => {
				state.loading = false;
				state.collection = state.collection.filter(
					(link) => link.id !== String(action.payload)
				);
				toast.success('Link deleted successfully');
			})
			.addCase(deleteLink.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default linkSlice.reducer;
