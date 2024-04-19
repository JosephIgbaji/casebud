import { createSlice } from "@reduxjs/toolkit";
// import convertToDateFormat from "utils/convertToDateFormat";

const initialState = {
  name: null,
  email: null,
  id_number: null,
  password: null,
  confirm_password: null,
  police_division_id: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateFormdata(state, action) {
      const values = action.payload;
      let newState = { ...state };
      Object.assign(newState, values);
      return newState;
    },
    clearFormData(state) {
      let newState = { ...state };
      newState.name = null;
      newState.email = null;
      newState.id_number = null;
      newState.password = null;
      newState.confirm_password = null;
      newState.police_division_id = null;
      return newState;
    },
  },
});

export const { updateFormdata, clearFormData } = registerSlice.actions;
export default registerSlice.reducer;
