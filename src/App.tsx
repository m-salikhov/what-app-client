import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./Hooks/redux";
import { getUserPreload } from "./Store/reducers/UserSlice";
import AddTournament from "./Components/AddTournament/AddTournament";
import All from "./Components/AllTournaments/All";
import Entry from "./Components/Entry/Entry";
import Layout from "./Components/Lyout/Layout";
import Main from "./Components/Main/Main";
import Profile from "./Components/Profile/Profile";
import Tournament from "./Components/Tournament/Tournament";
import PrivateRoute from "./hoc/PrivateRoute";
import List from "./Components/PlayMode/List";
import PlayMode from "./Components/PlayMode/PlayMode";
import { About } from "./Components/About/About";
import "./CommonStyle/style.scss";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserPreload());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="about" element={<About />} />
          <Route
            path="add"
            element={
              <PrivateRoute>
                <AddTournament />
              </PrivateRoute>
            }
          />
          <Route path="all" element={<All />} />
          <Route path="entry" element={<Entry />} />
          <Route path="playmode" element={<List />} />
          <Route path="playmode/:id" element={<PlayMode />} />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="tournament/:id" element={<Tournament />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
