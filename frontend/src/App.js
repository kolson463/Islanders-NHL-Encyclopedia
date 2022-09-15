import React, { Fragment } from "react";
import "./App.css";


//components
import Db from "./components/Db";

import PlayerTable from "./pages/PlayerTable";
import PlayerDetails from "./pages/PlayerDetails";
import LoginPage from "./pages/LoginPage";
import Redirect from "./pages/Redirect";


import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route,} from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        
          <Route index element={<LoginPage />} />

          <Route path="/player_table/:username" element={<PlayerTable />} />
          <Route path="/player/:nhl_id" element={<PlayerDetails />} />
          <Route path="/redirect/:comp_id" element={<Redirect />} />
          <Route path="*" element={<NoPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
