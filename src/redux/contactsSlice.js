import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  isLoading: false,
  error: null
}

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://655c739e25b76d9884fd4966.mockapi.io/contacts`)
      return data
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.message) // err.response.data
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://655c739e25b76d9884fd4966.mockapi.io/contacts`, data)
      return response.data
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.message) // err.response.data
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, {rejectWithValue}) => {
    try {
      const { data } = await axios.delete(`https://655c739e25b76d9884fd4966.mockapi.io/contacts/${contactId}`)
      return data
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.message) // err.response.data
    }
  }
)

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: "contacts",
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {},
  extraReducers: builder =>
    builder.addCase(fetchContacts.fulfilled, (state, {payload}) => {
    state.isLoading = false;
    state.items = payload;
  }).addCase(addContact.fulfilled, (state, {payload}) => {
    state.isLoading = false;
    state.items = [payload, ...state.items];
  }).addCase(deleteContact.fulfilled, (state, {payload}) => {
    state.isLoading = false;
    state.items = state.items.filter(item => item.id !== payload.id);
  }).addMatcher(isAnyOf(
    fetchContacts.pending,
    deleteContact.pending,
    addContact.pending
  ), (state) => {
    state.isLoading = true;
    state.error = null;
  }).addMatcher(isAnyOf(
    fetchContacts.rejected,
    deleteContact.rejected,
    addContact.rejected
  ), (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
  }),
});

// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;