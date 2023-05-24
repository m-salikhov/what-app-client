import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initUser } from "../../Helpers/initValues";
import { _axios } from "../../Helpers/_axios";
import { UserAuth, UserType } from "../../Types/user";

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

export const getUserPreload = createAsyncThunk<UserType>(
  "users/preload",
  async () => {
    const user = await _axios
      .get<UserType>("/auth/logfirst")
      .then((res) => res.data);
    return user;
  }
);

export const loginUser = createAsyncThunk<
  UserType,
  UserAuth,
  { rejectValue: string }
>("users/login", async (loginUser, { rejectWithValue }) => {
  const user = await _axios
    .post<UserType>("/auth/login", loginUser)
    .then((res) => res.data)
    .catch((e) => {
      return rejectWithValue(e.response?.data?.message || "Ошибка входа");
    });

  return user;
});

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPreload.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || "Ошибка входа";
        state.isLoading = false;
      });
  },
});

export const { setCurrentUser, resetCurrentUser, resetError } =
  userSlice.actions;
export default userSlice.reducer;
