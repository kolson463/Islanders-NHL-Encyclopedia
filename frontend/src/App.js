import React, { Fragment } from "react";
import "./App.css";


//components
import Db from "./components/Db";
import Header from "./components/Header";
import PlayerTable from "./pages/PlayerTable";
import PlayerDetails from "./pages/PlayerDetails";
import LoginPage from "./pages/LoginPage";
import Redirect from "./pages/Redirect";

import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route,} from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<LoginPage />} />

          <Route path="/player_table/:username" element={<PlayerTable />} />
          <Route path="/player/:nhl_id" element={<PlayerDetails />} />
          <Route path="/redirect/:comp_id" element={<Redirect />} />
          <Route path="*" element={<NoPage />} />
        {/* </Route>  */}
      </Routes>
    </BrowserRouter>




//     <Fragment>
//       <div className="container">
//         <Header />
           
//        {/* <PlayerTable />
//         <Db />*/}
      
//      <PlayerDetails nhl_id={"8481522"} username={"User1"}/>
// </div>
//     {/*   <LoginPage /> */} 
      

//     </Fragment>
  );
}

export default App;
