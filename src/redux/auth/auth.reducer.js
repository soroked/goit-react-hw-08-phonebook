import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
})

const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post('/users/login', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.post('/users/logout');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.auth;
      setToken(token);
      const { data } = await instance.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const { token } = state.auth;
      if (!token) return false;
      return true;
    }
  }
)

const initialState = {
  isLoading: false,
  error: null,
  authenticated: false,
  token: null,
  userData: null,
}

// user1
// qwertyytrewq123456@gmail.com
// qwerty123456

// user2
// qwertyytrewq1234567@gmail.com
// qwerty123456

const authSlice = createSlice({
  // Ім'я слайсу
  name: "auth",
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {},
  extraReducers: builder =>
    builder.addCase(loginThunk.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.authenticated = true;
      state.token = payload.token;
      state.userData = payload.user;
  }).addCase(logoutThunk.fulfilled, () => {
    return initialState;
  }).addCase(registerThunk.fulfilled, (state, {payload}) => {
    state.isLoading = false;
    state.authenticated = true;
    state.token = payload.token;
    state.userData = payload.user;
  }).addCase(refreshThunk.fulfilled, (state, {payload}) => {
    state.isLoading = false;
    state.authenticated = true;
    state.userData = payload;
  }).addMatcher(isAnyOf(
    loginThunk.pending,
    logoutThunk.pending,
    registerThunk.pending,
    refreshThunk.pending,
  ), (state) => {
    state.isLoading = true;
    state.error = null;
  }).addMatcher(isAnyOf(
    loginThunk.rejected,
    logoutThunk.rejected,
    registerThunk.rejected,
    refreshThunk.rejected,
  ), (state, {payload}) => {
    state.isLoading = false;
    state.error = payload;
  }),
});

export const authReducer = authSlice.reducer;