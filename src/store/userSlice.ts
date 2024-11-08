import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  greeting: string;
  isProfileUpdated: boolean;
}

const initialState: UserState = {
  name: "",
  greeting: "",
  isProfileUpdated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName(state: UserState, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    updateGreeting(state: UserState, action: PayloadAction<string>) {
      state.greeting = action.payload;
    },
    setProfileUpdated(state: UserState, action: PayloadAction<boolean>) {
      state.isProfileUpdated = action.payload;
    },
  },
});

export const { setUserName, updateGreeting, setProfileUpdated } =
  userSlice.actions;
export default userSlice.reducer;
