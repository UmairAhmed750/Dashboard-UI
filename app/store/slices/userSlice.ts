import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState  {
    userName: string
}

const initialState: userState = {
  userName: "Naveed", 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;