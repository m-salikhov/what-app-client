import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./CommonStyle/style.scss";
import AddTournament from "./Components/AddTournament/AddTournament";
import All from "./Components/AllTournaments/All";
import Entry from "./Components/Entry/Entry";
import Layout from "./Components/Lyout/Layout";
import Main from "./Components/Main/Main";
import Profile from "./Components/Profile/Profile";
import Tournament from "./Components/Tournament/Tournament";
import PrivateRoute from "./hoc/PrivateRoute";
import { _axios } from "./Helpers/_axios";
import { useAppDispatch } from "./Hooks/redux";
import { UserType } from "./Types/user";
import { userSlice } from "./Store/reducers/UserSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    _axios
      .get<UserType>("/auth/logfirst")
      .then((res) => dispatch(userSlice.actions.setCurrentUser(res.data)))
      .catch(() => console.log("Не авторизован"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="entry" element={<Entry />} />
          <Route path="all" element={<All />} />
          <Route
            path="add"
            element={
              <PrivateRoute>
                <AddTournament />
              </PrivateRoute>
            }
          />
          <Route path="tournament/:id" element={<Tournament />} />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
