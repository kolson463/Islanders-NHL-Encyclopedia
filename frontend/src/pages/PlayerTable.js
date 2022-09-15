import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";

import Header from "../components/Header";

function PlayerTable() {

let navigate = useNavigate()
let { username } = useParams()

  const [isLoading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedShoots, setSelectedShoots] = useState("All");

  // const get2122PlayerData = async (nhl_id) => {
  //   try {
  //     const res = await fetch(
  //       "https://statsapi.web.nhl.com/api/v1/people/" +
  //         nhl_id +
  //         "/stats?stats=statsSingleSeason&season=20212022"
  //     );
  //     const playerData2122 = await res.json();
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const getPlayers = () => {
    try {
      fetch("http://localhost:5000/players").then(async (response) => {
        const jsonData = await response.json();
        setPlayers(jsonData);
        setFilteredPlayers(jsonData);
        setLoading(false);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getGoalieStats = () => {
    try {
      fetch("http://localhost:5000/goalie_stats_2122").then(
        async (response) => {
          const jsonData = await response.json();
          //setPlayers(jsonData);
          //setFilteredPlayers(jsonData);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const getSkaterStats = () => {
    try {
      fetch("http://localhost:5000/skater_stats_2122").then(
        async (response) => {
          const jsonData = await response.json();
          //setPlayers(jsonData);
          //setFilteredPlayers(jsonData);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  // const filterSearchName = (searchEntry) => {
  //   const tempArray = [];

  //   players.forEach((player) => {
  //     if (player.player_full_name.includes(searchEntry)) {
  //       tempArray.push(player);
  //     }
  //   });
  //   setFilteredPlayers(tempArray);
  //   return;
  // };

  function filterFunction(position, team, shoots) {
    var parsed1 = filterPositions(position);

    var parsed2 = filterTeams(team, parsed1);

    var parsed3 = filterShoots(shoots, parsed2);

    setFilteredPlayers(parsed3);
  }

  function filterPositions(position) {
    if (position === "All") {
      setSelectedPosition("All");
      //setFilteredPlayers(players);
      console.log("Filter Positions " + position);
      const unparsed = players;
      return unparsed;
    } else if (position === "Skaters") {
      var tempArray = [];

      players.forEach((player) => {
        if (player.player_position !== "G") {
          tempArray.push(player);
        }
      });
      setSelectedPosition("Skaters");
      //setFilteredPlayers(tempArray);
      console.log("Filter Positons " + position);
      return tempArray;
    } else {
      var tempArray = [];
      players.forEach((player) => {
        if (player.player_position === position) {
          tempArray.push(player);
        }
      });
      setSelectedPosition(position);
      //setFilteredPlayers(tempArray);
      console.log("Filter Positons " + position);
      return tempArray;
    }
  }

  function filterTeams(team, parsed) {
    if (team === "All") {
      setSelectedTeam("All");
      //setFilteredPlayers(players);
      console.log("Filter team " + team);
      return parsed;
    } else {
      var tempArray = [];
      parsed.forEach((player) => {
        if (player.player_team === team) {
          tempArray.push(player);
        }
      });
      setSelectedTeam(team);
      //setFilteredPlayers(tempArray);
      return tempArray;
    }
    //console.log("filter Teams "+ team)
  }

  function filterShoots(shoots, parsed) {
    if (shoots === "All") {
      setSelectedShoots("All");
      return parsed;
    } else {
      const tempArray = [];
      parsed.forEach((player) => {
        if (player.player_shoots === shoots) {
          tempArray.push(player);
        }
      });
      setSelectedShoots(shoots);
      //setFilteredPlayers(tempArray);
      return tempArray;
    }
  }

  return (
    <>
      <div className="container">
      <div className="row">
        <h1 className="col-5">NHL Encyclopedia</h1>
        <div className="col">
<h6 className="text-center"> {username} Logged In</h6>
        </div>
        
        
        <div className="col">
<button className="btn-sm  " onClick={()=> navigate("/")}>Log Out</button>
        </div>
        
      </div>
    </div >
    
      <Fragment>
<div className="container">

        <h1>{isLoading ? "Loading" : ""}</h1>
        <h6>Showing {filteredPlayers.length} Players </h6>

        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">NHL ID</th>
              <th scope="col">Name</th>
              <th scope="col">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pos: {selectedPosition}
                  </button>
                  <ul className="dropdown-menu">
                    <li
                      onClick={() =>
                        filterFunction("All", selectedTeam, selectedShoots)
                      }
                    >
                      <a className="dropdown-item" href="#">
                        All
                      </a>
                    </li>
                    <li
                      onClick={() =>
                        filterFunction("Skaters", selectedTeam, selectedShoots)
                      }
                    >
                      <a className="dropdown-item" href="#">
                        Skaters
                      </a>
                    </li>
                    <li
                      onClick={() =>
                        filterFunction("C", selectedTeam, selectedShoots)
                      }
                    >
                      <a className="dropdown-item" href="#">
                        C
                      </a>
                    </li>
                    <li
                      onClick={() =>
                        filterFunction("LW", selectedTeam, selectedShoots)
                      }
                    >
                      <a className="dropdown-item" href="#">
                        LW
                      </a>
                    </li>
                    <li
                      onClick={() =>
                        filterFunction("RW", selectedTeam, selectedShoots)
                      }
                    >
                      <a className="dropdown-item" href="#">
                        RW
                      </a>
                    </li>
                    <li
                      onClick={() =>
                        filterFunction("D", selectedTeam, selectedShoots)
                      }
                    >
                      <a className="dropdown-item" href="#">
                        D
                      </a>
                    </li>
                    <li
                      onClick={() =>
                        filterFunction("G", selectedTeam, selectedShoots)
                      }
                    >
                      <a className="dropdown-item" href="#">
                        G
                      </a>
                    </li>
                  </ul>
                </div>
              </th>
              <th scope="col">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Team: {selectedTeam}
                  </button>
                  <ul className="dropdown-menu multi-column columns-5">
                    <div className="row ">
                      {" "}
                      <div className="col-sm-2">
                        <li>
                          <a
                            href="#"
                            onClick={() =>
                              filterFunction(
                                selectedPosition,
                                "All",
                                selectedShoots
                              )
                            }
                          >
                            All
                          </a>
                        </li>
                      </div>
                      <div className="col-sm-2">
                        <ul className="multi-column-dropdown">
                          <li className="text-center">Atlantic</li>

                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "FLA",
                                  selectedShoots
                                )
                              }
                            >
                              FLA
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "TOR",
                                  selectedShoots
                                )
                              }
                            >
                              TOR
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "TBL",
                                  selectedShoots
                                )
                              }
                            >
                              TBL
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "BOS",
                                  selectedShoots
                                )
                              }
                            >
                              BOS
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "BUF",
                                  selectedShoots
                                )
                              }
                            >
                              BUF
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "DET",
                                  selectedShoots
                                )
                              }
                            >
                              DET
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "OTT",
                                  selectedShoots
                                )
                              }
                            >
                              OTT
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "MTL",
                                  selectedShoots
                                )
                              }
                            >
                              MTL
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-sm-2">
                        <ul className="multi-column-dropdown">
                          <li className="text-center">Metro</li>

                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "CAR",
                                  selectedShoots
                                )
                              }
                            >
                              CAR
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "NYR",
                                  selectedShoots
                                )
                              }
                            >
                              NYR
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "PIT",
                                  selectedShoots
                                )
                              }
                            >
                              PIT
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "WSH",
                                  selectedShoots
                                )
                              }
                            >
                              WSH
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "NYI",
                                  selectedShoots
                                )
                              }
                            >
                              NYI
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "CBJ",
                                  selectedShoots
                                )
                              }
                            >
                              CBJ
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "NJD",
                                  selectedShoots
                                )
                              }
                            >
                              NJD
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "PHI",
                                  selectedShoots
                                )
                              }
                            >
                              PHI
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-sm-2">
                        <ul className="multi-column-dropdown">
                          <li className="text-center">Central</li>

                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "COL",
                                  selectedShoots
                                )
                              }
                            >
                              COL
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "MIN",
                                  selectedShoots
                                )
                              }
                            >
                              MIN
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "STL",
                                  selectedShoots
                                )
                              }
                            >
                              STL
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "DAL",
                                  selectedShoots
                                )
                              }
                            >
                              DAL
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "NSH",
                                  selectedShoots
                                )
                              }
                            >
                              NSH
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "WPG",
                                  selectedShoots
                                )
                              }
                            >
                              WPG
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "CHI",
                                  selectedShoots
                                )
                              }
                            >
                              CHI
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "ARI",
                                  selectedShoots
                                )
                              }
                            >
                              ARI
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-sm-2">
                        <ul className="multi-column-dropdown">
                          <li className="text-center">Pacific</li>

                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "CGY",
                                  selectedShoots
                                )
                              }
                            >
                              CGY
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "EDM",
                                  selectedShoots
                                )
                              }
                            >
                              EDM
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "LAK",
                                  selectedShoots
                                )
                              }
                            >
                              LAK
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "VGK",
                                  selectedShoots
                                )
                              }
                            >
                              VGK
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "VAN",
                                  selectedShoots
                                )
                              }
                            >
                              VAN
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "SJS",
                                  selectedShoots
                                )
                              }
                            >
                              SJS
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "ANA",
                                  selectedShoots
                                )
                              }
                            >
                              ANA
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={() =>
                                filterFunction(
                                  selectedPosition,
                                  "SEA",
                                  selectedShoots
                                )
                              }
                            >
                              SEA
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </ul>
                </div>
              </th>

              <th scope="col">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Shoots: {selectedShoots}
                  </button>
                  <ul className="dropdown-menu">
                    <li
                      onClick={() =>
                        filterFunction(selectedPosition, selectedTeam, "All")
                      }
                    >
                      <a className="dropdown-item" href="#">
                        All
                      </a>
                    </li>
                    <li
                      onClick={() =>
                        filterFunction(selectedPosition, selectedTeam, "L")
                      }
                    >
                      <a className="dropdown-item" href="#">
                        L
                      </a>
                    </li>
                    <li
                      onClick={() =>
                        filterFunction(selectedPosition, selectedTeam, "R")
                      }
                    >
                      <a className="dropdown-item" href="#">
                        R
                      </a>
                    </li>
                  </ul>
                </div>
              </th>
              <th scope="col">Age</th>
              

              {/* {selectedPosition === "All" ? (
                ""
              ) : selectedPosition === "G" ? (
                <>
                  <th scope="col">Goalie Stats</th>
                </>
              ) : (
                <>
                  {" "}
                  <th scope="col">Games</th>
                  <th scope="col">Points</th>
                  <th scope="col">Goals</th>
                  <th scope="col">Assists</th>
                  <th scope="col">PlusMinus</th>
                  <th scope="col">Ice Time Per Game</th>
                  <th scope="col">PIM</th>
                  <th scope="col">Shooting%</th>
                  <th scope="col">Hits</th>
                </>
              )} */}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td>"Loading Data"</td>
              </tr>
            ) : (
              filteredPlayers.map((player) => (
                <>
                  <tr>
                    
                    <td >{player.nhl_id}</td>
                    {/* <td  onClick={()=> navigate(`/player/${player.nhl_id}`)}>
                     <button></button>
                
                        
                      
                    </td> */}
                   <td><Link to={"/player/"+player.nhl_id} state={{username: username}}>{player.player_first_name +
                          " " +
                          player.player_last_name} </Link></td> 
                    <td>{player.player_position}</td>
                    <td>{player.player_team}</td>
                    <td>{player.player_shoots}</td>
                    <td>{player.player_age}</td>
                  </tr>
                </>
              ))
            )}
          </tbody>
          {/* )} */}
        </table></div>
      </Fragment>
      
    </>
  );
}

export default PlayerTable;
