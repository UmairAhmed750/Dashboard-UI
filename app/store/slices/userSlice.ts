import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userName: string;
  email: string;
  role: "owner" | "buyer" | "";
}

const initialState: UserState = {
  userName: "",
  email: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Ye function login ke waqt call hoga
    setUserData: (state, action: PayloadAction<{name: string, email: string}>) => {
      state.userName = action.payload.name;
      state.email = action.payload.email;
      
      // Email check logic
      if (action.payload.email === "admin@gmail.com") {
        state.role = "owner";
      } else {
        state.role = "buyer";
      }
    },
    clearUser: (state) => {
      state.userName = "";
      state.email = "";
      state.role = "";
    },
  },
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;