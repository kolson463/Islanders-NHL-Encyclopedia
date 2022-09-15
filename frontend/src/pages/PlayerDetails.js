import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

function PlayerDetails() {
  let navigate = useNavigate();
  let { nhl_id } = useParams();
  let location = useLocation();

  let username = location.state.username;

  const [playerData, setPlayerData] = useState([]);
  const [playerNotes, setPlayerNotes] = useState([]);
  const [playerTags, setPlayerTags] = useState([]);
  const [playerComps, setPlayerComps] = useState([]);

  const [skaterStats, setSkaterStats] = useState([]);
  const [goalieStats, setGoalieStats] = useState([]);
  const [skaterSearch, setSkaterSearch] = useState();
  const [goalieSearch, setGoalieSearch] = useState();

  const [loading, setLoading] = useState(true);

  const [addTags, setAddTags] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [addComp, setAddComp] = useState(false);

  useEffect(() => {
    getPlayer();
    getNotes();
    getTags();
    getComps();
    getGoalieStats();
    getSkaterStats();
    getSkatersSearch();
    getGoalieSearch();
  }, []);

  function getPlayer() {
    try {
      fetch("http://localhost:5000/players/" + nhl_id).then(
        async (response) => {
          const jsonData = await response.json();
          setPlayerData(jsonData[0]);

          // console.log("jsonData" + JSON.stringify(jsonData[0].player_position));

          //setLoading(false);
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  const getNotes = () => {
    try {
      fetch("http://localhost:5000/notes/" + nhl_id).then(async (response) => {
        const jsonData = await response.json();
        setPlayerNotes(jsonData);
        //console.log("Notes" + jsonData);
        //setLoading(false);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTags = () => {
    try {
      fetch("http://localhost:5000/tags/" + nhl_id).then(async (response) => {
        const jsonData = await response.json();
        setPlayerTags(jsonData);
        //console.log(jsonData);
        //setLoading(false);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getComps = () => {
    try {
      fetch("http://localhost:5000/comps/" + nhl_id).then(async (response) => {
        const jsonData = await response.json();
        setPlayerComps(jsonData);
        //console.log(jsonData);
        //setLoading(false);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getGoalieStats = () => {
    try {
      fetch("http://localhost:5000/goalie_stats/nhl_id/" + nhl_id).then(
        async (response) => {
          const jsonData = await response.json();
          setGoalieStats(jsonData);
          //console.log(jsonData);
          //setLoading(false);
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const getSkaterStats = () => {
    try {
      fetch("http://localhost:5000/skater_stats/nhl_id/" + nhl_id).then(
        async (response) => {
          const jsonData = await response.json();
          setSkaterStats(jsonData);
          //console.log("skater stats" + JSON.stringify(jsonData));
          //setLoading(false);
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const getSkatersSearch = () => {
    try {
      fetch("http://localhost:5000/players/skaters").then(async (response) => {
        const jsonData = await response.json();
        setSkaterSearch(jsonData);
        //console.log("skater search" + JSON.stringify(jsonData));
        //setLoading(false);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getGoalieSearch = () => {
    try {
      fetch("http://localhost:5000/players/goalies").then(async (response) => {
        const jsonData = await response.json();
        setGoalieSearch(jsonData);
        //console.log("skater stats" + JSON.stringify(jsonData));
        setLoading(false);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const [noteInput, setNoteInput] = useState("");

  const postNote = async (e) => {
    e.preventDefault();
    var author = username;
    var note = noteInput;

    try {
      console.log("nhlid " + nhl_id + " + note: + " + note + "user: " + author);
      const body = {
        nhl_id,
        note,
        author,
      };
      console.log(body);
      const response = await fetch("http://localhost:5000/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
      setNoteInput("");
      getNotes();
    } catch (error) {
      console.error(error.message);
    }
  };

  const [tagInput, setTagInput] = useState("Strong on Edges");

  const postTag = async (e) => {
    e.preventDefault();
    var author = username;
    var tag = tagInput;

    try {
      console.log("nhlid " + nhl_id + " + tag: + " + tag + "user: " + author);
      const body = {
        nhl_id,
        tag,
        author,
      };
      console.log(body);
      const response = await fetch("http://localhost:5000/tag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
      setTagInput("");
      getTags();
    } catch (error) {
      console.error(error.message);
    }
  };

  async function addToComps(comp_full_name, comp_position, comp_nhl_id, e) {
    e.preventDefault();
    var author = username;

    try {
      console.log(
        "nhlid " + nhl_id + " + " + comp_full_name + " " + comp_position
      );
      const body = {
        nhl_id,
        comp_nhl_id,
        comp_full_name,
        comp_position,
        author,
      };
      console.log(body);
      const response = await fetch("http://localhost:5000/comp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
      getComps();
    } catch (error) {
      console.error(error.message);
    }
  }

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);

  const searchFunction = async (e) => {
    e.preventDefault();

    if (searchInput.length < 3) {
      setSearchLoading(true);

      return;
    }

    console.log("At least 3: " + searchInput.length);
    try {
      fetch("http://localhost:5000/search/?search=" + searchInput)
        .then((response) => response.json())
        .then((data) => setSearchResults(data));
    } catch (error) {
      console.error(error.message);
    }
    showSearchFunction();
  };

  function showSearchFunction() {
    setSearchLoading(false);
  }




  async function deleteComp(comp_db_id){
    try {
      //const { comp_db_id } = req.params;
     const response = await fetch("http://localhost:5000/comp/" + comp_db_id, {
      method: 'DELETE'
      }).then((data) => getComps());
  
      //  var data =  await response.json
      //  console.log("DeleteComp Response"+ data)
        // 
    } catch (error) {
      console.error(error.message);
    }
    //getComps();
  };


  async function deleteNote(note_id){
    try {
      //const { comp_db_id } = req.params;
     const response = await fetch("http://localhost:5000/note/" + note_id, {
      method: 'DELETE'
      }).then((data) => getNotes());
  
      //  var data =  await response.json
      //  console.log("DeleteComp Response"+ data)
        // 
    } catch (error) {
      console.error(error.message);
    }
    //getComps();
  };

  async function deleteTag(tag_id){
    try {
      //const { comp_db_id } = req.params;
     const response = await fetch("http://localhost:5000/tag/" + tag_id, {
      method: 'DELETE'
      }).then((data) => getTags());
  
      //  var data =  await response.json
      //  console.log("DeleteComp Response"+ data)
        // 
    } catch (error) {
      console.error(error.message);
    }
    //getComps();
  };











  

  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="col-5">NHL Encyclopedia</h1>
          <div className="col">
            <h6 className="text-center"> {username} Logged In</h6>
          </div>
          <div className="col">
            <button
              className="btn-sm  "
              onClick={() => navigate("/player_table/" + username)}
            >
              Back to Table
            </button>
          </div>

          <div className="col">
            <button className="btn-sm  " onClick={() => navigate("/")}>
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row ">
          <div className="col border text-center">
            {loading ? (
              "Loading"
            ) : (
              <>
                {" "}
                <img
                  src={
                    "https://cms.nhl.bamgrid.com/images/headshots/current/168x168/" +
                    playerData.nhl_id +
                    ".jpg"
                  }
                />
                <h1>
                  {playerData.player_first_name +
                    " " +
                    playerData.player_last_name}
                </h1>
                <h5>
                  {playerData.player_position +
                    "  |  " +
                    playerData.player_shoots +
                    "  |  " +
                    playerData.player_height +
                    "  |  " +
                    playerData.player_weight +
                    "  |  " +
                    playerData.player_age +
                    "  |  " +
                    playerData.player_team +
                    "  |  "}
                  <span>
                    <a href={playerData.nhl_link} target="_blank">
                      NHL Link{" "}
                    </a>{" "}
                  </span>
                </h5>
              </>
            )}
          </div>
          <div className="col border">
            <h1>Stats </h1>
            {loading ? (
              "Loading"
            ) : (
              <>
                {playerData.player_position === "G" ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Year</th>
                          <th scope="col">Games</th>
                          <th scope="col">Games Started</th>
                          <th scope="col">Wins</th>
                          <th scope="col">Losses</th>
                          <th scope="col">OT</th>
                          <th scope="col">SO</th>
                          <th scope="col">Save %</th>
                          <th scope="col">GAA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {goalieStats.map((player, index) => (
                          <tr key={index}>
                            <td>{player.year}</td>
                            <td>{player.games_played}</td>
                            <td>{player.games_started}</td>
                            <td>{player.wins}</td>
                            <td>{player.losses}</td>
                            <td>{player.overtime}</td>
                            <td>{player.shutouts}</td>
                            <td>{player.save_percentage}</td>
                            <td>{player.goals_against_average}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Year</th>
                          <th scope="col">Games</th>
                          <th scope="col">Points</th>
                          <th scope="col">Goals</th>
                          <th scope="col">Assists</th>
                          <th scope="col">PlusMinus</th>
                          <th scope="col">IceTime </th>
                          <th scope="col">PIM</th>
                          <th scope="col">Shooting%</th>
                          <th scope="col">Hits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {skaterStats.map((player) => (
                          <tr>
                            <td>{player.year}</td>
                            <td>{player.games}</td>
                            <td>{player.points}</td>
                            <td>{player.goals}</td>
                            <td>{player.assists}</td>
                            <td>{player.plus_minus}</td>
                            <td>{player.time_on_ice_per_game}</td>
                            <td>{player.penalty_minutes}</td>
                            <td>{player.shot_pct}</td>
                            <td>{player.hits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="row ">
          <div className="col border ">
            <div className="container">
              <div className="row">
                <h1 className="col-sm text-end">Tags</h1>
                <div className="col-sm text-start">
<button
                  className="btn border "
                  onClick={() => setAddTags(!addTags)}
                >
                  {addTags ? "-" : "+"}
                </button>
                </div>
                
                {addTags ? (
                  <form className="form-inline" onSubmit={postTag}>
                    <div className="form-group">
                      <div className="form-group">
                        <select
                          //multiple
                          className="form-control"
                          id="exampleFormControlSelect2"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                        >
                          <option>Strong on Edges</option>
                          <option>Plays Heavy Game</option>
                          <option>Stretch Pass Specialist</option>
                          <option>Power Play Specialist</option>
                          <option>Shot Blocker</option>
                        </select>
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                ) : (
                  ""
                )}

                {loading
                  ? " "
                  : playerTags.map((tag) => (
                      <div className="card" key={tag.tag_id}>
                        <h4 className="card-title">{tag.tag}</h4>
                        <div class="row ">
                          <h6 className="card-text w-50">{tag.author + " "}</h6>
                          <button type="button" class="btn btn-outline-danger w-50" onClick={()=>deleteTag(tag.tag_id)}>Delete</button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {/* Notes  */}
          <div className="col border">
            <div className="container">
              <div className="row">
                <h1 className="col-sm">Notes</h1>
                <button
                  className="btn border col-sm"
                  onClick={() => setAddNote(!addNote)}
                >
                  {addNote ? "-" : "+"}
                </button>

                {addNote ? (
                  <form className="form-inline" onSubmit={postNote}>
                    <div className="form-group">
                      <textarea
                        placeholder="Add Note"
                        className="form-control"
                        id="noteText"
                        rows="2"
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                      ></textarea>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                ) : (
                  ""
                )}

                {loading
                  ? " "
                  : playerNotes.map((note) => (
                      <div className="card" key={note.note_id}>
                        <h5 className="card-title">{note.note}</h5>
                        <div class="row ">
                          <h6 className="card-text w-50">{note.author + " "}</h6>
                          <button type="button" class="btn btn-outline-danger w-50" onClick={()=>deleteNote(note.note_id)}>Delete</button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className="col border">
            <div className="container">
              <div className="row">
                <h1 className="col-sm">Comps</h1>
                <button
                  className="btn border col-sm"
                  onClick={() => setAddComp(!addComp)}
                >
                  {addComp ? "-" : "+"}
                </button>

                {addComp ? (
                  <>
                    <form className="form-inline" onSubmit={searchFunction}>
                      <div className="form-group">
                        <div className="row">
                          <input
                            className="col-lg"
                            placeholder="Search by Name"
                            value={searchInput}
                            onChange={(e) => {
                              setSearchInput(e.target.value);
                            }}
                          ></input>

                          <button
                            type="submit"
                            className="btn btn-primary col-sm"
                          >
                            Search
                          </button>
                          {searchLoading ? (
                            ""
                          ) : (
                            <button
                              onClick={(e) => {
                                setSearchLoading(true);
                                setSearchInput('')
                              }}
                              className="btn btn-primary col-sm"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>
                    </form>

                    {searchLoading ? (
                      ""
                    ) : (
                      <ul class="list-group overflow-auto ">
                        {searchResults.map((player) => (
                          <li>
                            <button
                            type="button"
                              onClick={(e) =>
                                addToComps(
                                  player.player_full_name,
                                  player.player_position,
                                  player.nhl_id,
                                  e
                                )
                              }
                              className=" btn btn-outline-primary"
                            >
                              {player.player_full_name +
                                " " +
                                player.player_position}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  ""
                )}

                {loading
                  ? " "
                  : playerComps.map((comp) => (
                      <div key={comp.comp_db_id} className="card m-1">
                        <h5 className="card-title ">
                          
                          <Link
                            to={"/redirect/" + comp.comp_nhl_id}
                            state={{ username: username }}
                          >
                            {comp.comp_full_name + " " + comp.comp_position}{" "}
                          </Link>
                        </h5>

                        <div class="row ">
                          <h6 className="card-text w-50">{comp.author + " "}</h6>
                          <button type="button" class="btn btn-outline-danger w-50" onClick={()=>deleteComp(comp.comp_db_id)}>Delete</button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerDetails;
