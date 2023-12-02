import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { instance } from "./auth/auth.reducer";

const initialState = {
  items: [],
  isLoading: false,
  error: null
}

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue}) => {
    try {
      const { data } = await instance.get('/contacts');
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/contacts`, formData)
      console.log('data: ', data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, {rejectWithValue}) => {
    try {
      const { data } = await instance.delete(`/contacts/${contactId}`)
      return data
    } catch (err) {
      return rejectWithValue(err.message)
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