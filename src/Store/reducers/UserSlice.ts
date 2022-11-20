import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initUser } from "../../Helpers/initValues";
import { UserType } from "../../Types/user";

interface UserState {
  currentUser: UserType;
  users: UserType[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  currentUser: initUser,
  users: [],
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserType>) {
      state.currentUser = action.payload;
    },

    resetCurrentUser(state) {
      state.currentUser = initUser;
    },

    resetError(state) {
      state.error = "";
    },

    userFetching(state) {
      state.isLoading = true;
    },
    userFetchingSuccess(state, action: PayloadAction<UserType>) {
      state.isLoading = false;
      state.error = "";
      state.currentUser = action.payload;
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.currentUser = initUser;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
