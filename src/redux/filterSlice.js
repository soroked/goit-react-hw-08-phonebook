import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

// Експортуємо генератори екшен креейторів та редюсер
export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;