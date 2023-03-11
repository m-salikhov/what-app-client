import { _axios } from "../../Helpers/_axios";
import { UserAuth, UserType } from "../../Types/user";
import { AppDispatch } from "../store";
import { userSlice } from "./UserSlice";

export const loginUserOld =
  (loginUser: UserAuth) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.userFetching());
      const res = await _axios.post<UserType>("/auth/login", loginUser);

      dispatch(userSlice.actions.userFetchingSuccess(res.data));
    } catch (error: any) {
      dispatch(
        userSlice.actions.userFetchingError(
          error.response.data?.message || "error"
        )
      );
    }
  };
