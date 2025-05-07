import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface User {
  _id: string;
  name: string;
  email: string;

}

export interface UserState {  
  user: User | null;
  authenticated: boolean;
}

const initialState: UserState = {
  user: null,
  authenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.authenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
