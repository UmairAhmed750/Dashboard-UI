import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userName: string;
  email: string;
  role: string;
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
    setUserData: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.userName = action.payload.name;
      state.email = action.payload.email;
      
      const loginEmail = action.payload.email.toLowerCase().trim();

      // Email ke mutabik role assign karna
      if (loginEmail === "admin@gmail.com") {
        state.role = "owner";  
      } else if (loginEmail === "editor@gmail.com") {
        state.role = "editor"; 
      } else if (loginEmail === "buyer@gmail.com") {
        state.role = "buyer";  
      } else {
        state.role = "";
      }

      // 💾 Browser ki memory (localStorage) mein data mehfooz karna
      if (typeof window !== "undefined") {
        localStorage.setItem("userRole", state.role);
        localStorage.setItem("userName", state.userName);
        localStorage.setItem("userEmail", action.payload.email);
      }
    },
    
    clearUser: (state) => {
      state.userName = "";
      state.email = "";
      state.role = "";
      
      // 🧹 Logout hone par memory saaf karna
      if (typeof window !== "undefined") {
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
      }
    },
  },
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;