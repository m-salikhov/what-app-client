import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./Hooks/redux";
import { getUserPreload } from "./Store/reducers/UserSlice";
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
import AddTournamentLink from "./Components/AddTournamentLink/AddTournamentLink";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  const dispatch = useAppDispatch();

  dispatch(getUserPreload());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="addbylink" element={<AddTournamentLink />} />
          <Route path="all" element={<All />} />
          <Route path="entry" element={<Entry />} />
          <Route path="playmode">
            <Route index element={<List />} />
            <Route path=":id/:title" element={<PlayMode />} />
          </Route>
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="tournament/:id" element={<Tournament />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
