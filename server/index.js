const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware

app.use(cors());
app.use(express.json());

//Routes

//Add to users

app.post("/users", async (req, res) => {
  try {
    const { user_email, user_username, user_password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (user_email, user_username, user_password) VALUES($1, $2, $3) RETURNING *",
      [user_email, user_username, user_password]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all users

app.get("/users", async (req, res) => {
  try {
    const allusers = await pool.query("SELECT * FROM users");
    res.json(allusers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get specific user
app.get("/users/login", async (req, res) => {
  try {
    const { user_email, user_password } = req.params;

    console.log(req.body);
    const allusers = await pool.query("SELECT * FROM users WHERE user_email = ($1) AND user_password = ($2) ",
    [user_email,  user_password]);
    res.json(allusers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//Add players

app.post("/players", async (req, res) => {
  try {
    const { nhl_id, player_full_name, player_position } = req.body;
    const newPlayer = await pool.query(
      "INSERT INTO players (nhl_id, player_full_name, player_position) VALUES($1, $2, $3) RETURNING *",
      [nhl_id, player_full_name, player_position]
    );

    res.json(newPlayer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Add players

app.post("/players_ids", async (req, res) => {
  try {
    const {
      nhl_id,
      player_position,
      player_first_name,
      player_last_name,
      player_team,
      player_age,
      player_shoots,
      nhl_link,
      player_height,
      player_weight,
      player_full_name,
    } = req.body;
    const newPlayer = await pool.query(
      "INSERT INTO players (nhl_id, player_position, player_first_name, player_last_name, player_team, player_age, player_shoots, nhl_link, player_height, player_weight, player_full_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        nhl_id,
        player_position,
        player_first_name,
        player_last_name,
        player_team,
        player_age,
        player_shoots,
        nhl_link,
        player_height,
        player_weight,
        player_full_name,
      ]
    );

    res.json(newPlayer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all players

app.get("/players", async (req, res) => {
  try {
    const allPlayers = await pool.query("SELECT * FROM players");
    res.json(allPlayers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get all goalies

app.get("/players/goalies", async (req, res) => {
  try {
    const allPlayers = await pool.query(
      "SELECT nhl_id, player_full_name, player_first_name, player_last_name FROM public.players WHERE player_position = 'G' "
    );
    res.json(allPlayers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get all skaters

app.get("/players/skaters", async (req, res) => {
  try {
    const allPlayers = await pool.query(
      "SELECT nhl_id, player_full_name, player_first_name, player_last_name FROM public.players WHERE NOT player_position = 'G' "
    );
    res.json(allPlayers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get player from db id

app.get("/players/:nhl_id", async (req, res) => {
  try {
    const { nhl_id } = req.params;
    const player = await pool.query("SELECT * FROM players WHERE nhl_id = $1", [
      nhl_id,
    ]);
    res.json(player.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get player from nhl id

app.get("/players/nhl_id/:nhl_id", async (req, res) => {
  try {
    const { nhl_id } = req.params;
    const player = await pool.query("SELECT * FROM players WHERE nhl_id = $1", [
      nhl_id,
    ]);
    res.json(player.rows);
  } catch (error) {
    console.error(error.message);
  }
});


//get player from search

app.get("/search", async (req, res) => {
  try {
    const { search } = req.query;
    const player = await pool.query("SELECT nhl_id, player_full_name, player_position FROM players WHERE player_full_name ILIKE $1", 
     [      "%"+search+"%"]
      );
    res.json(player.rows);
  } catch (error) {
    console.error(error.message);
  }
});




//update player

app.put("/players/:nhl_id", async (req, res) => {
  try {
    const { nhl_id } = req.params;
    const { player_team, player_shoots, player_age } = req.body;
    const updatePlayers = await pool.query(
      "UPDATE players SET player_team = $1, player_shoots = $3, player_age = $4  WHERE nhl_id = $2 RETURNING *",
      [player_team, nhl_id, player_shoots, player_age]
    );
    res.json("Updated player: " + nhl_id);
  } catch (error) {
    console.error(error.message);
  }
});

//update player nhl link

app.put("/players/nhl_link/:nhl_id", async (req, res) => {
  try {
    const { nhl_id } = req.params;
    const { player_firstname, player_lastname } = req.body;
    const nhl_link =
      "https://www.nhl.com/player/" +
      player_firstname +
      "-" +
      player_lastname +
      "-" +
      nhl_id;

    const updatePlayers = await pool.query(
      "UPDATE players SET nhl_link = $1  WHERE nhl_id = $2 RETURNING *",
      [nhl_link, nhl_id]
    );
    res.json("Updated player: " + nhl_id);
  } catch (error) {
    console.error(error.message);
  }
});

//delete players

app.delete("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePlayer = await pool.query(
      "DELETE FROM players WHERE id = $1 RETURNING *",
      [id]
    );
    res.json("Player " + id + " deleted");
  } catch (error) {
    console.error(error.message);
  }
});

//delete players nhl ID

app.delete("/players/nhl_id/:nhl_id", async (req, res) => {
  try {
    const { nhl_id } = req.params;
    const deletePlayer = await pool.query(
      "DELETE FROM players WHERE nhl_id = $1 RETURNING *",
      [nhl_id]
    );
    res.json("Player " + id + " deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("server started on port:5000");
});

// add to goalie stats

app.post("/goalie_stats", async (req, res) => {
  try {
    const {
      nhl_id,
      year,
      games_played,
      games_started,
      wins,
      losses,
      overtime,
      shutouts,
      save_percentage,
      goals_against_average,
    } = req.body;
    const newGoalie = await pool.query(
      "INSERT INTO goalie_stats (nhl_id, year, games_played, games_started, wins, losses, overtime, shutouts, save_percentage, goals_against_average) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        nhl_id,
        year,
        games_played,
        games_started,
        wins,
        losses,
        overtime,
        shutouts,
        save_percentage,
        goals_against_average,
      ]
    );

    res.json(newGoalie.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all goalie stats 2122

app.get("/goalie_stats_2122", async (req, res) => {
  try {
    const allGoalieStats = await pool.query(
      "SELECT * FROM goalie_stats WHERE year = '2122'"
    );
    res.json(allGoalieStats.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get goalie stats one player

app.get("/goalie_stats/nhl_id/:nhl_id", async (req, res) => {
  try {
    const { nhl_id } = req.params;
    const goalieStats = await pool.query(
      "SELECT * FROM goalie_stats WHERE nhl_id = $1",
      [nhl_id]
    );
    res.json(goalieStats.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//add to skater stats

app.post("/skater_stats", async (req, res) => {
  try {
    const {
      nhl_id,
      year,
      games,
      points,
      goals,
      assists,
      plus_minus,
      time_on_ice_per_game,
      penalty_minutes,
      shot_pct,
      hits,
    } = req.body;
    const newSkater = await pool.query(
      "INSERT INTO skater_stats (nhl_id, year, games, points, goals, assists, plus_minus, time_on_ice_per_game, penalty_minutes, shot_pct, hits) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        nhl_id,
        year,
        games,
        points,
        goals,
        assists,
        plus_minus,
        time_on_ice_per_game,
        penalty_minutes,
        shot_pct,
        hits,
      ]
    );

    res.json(newSkater.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all skater stats 2122

app.get("/skater_stats_2122", async (req, res) => {
  try {
    const allGoalieStats = await pool.query(
      "SELECT * FROM skater_stats WHERE year = '2122'"
    );
    res.json(allGoalieStats.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get skater stats one player

app.get("/skater_stats/nhl_id/:nhl_id", async (req, res) => {
  try {
    const { nhl_id } = req.params;
    const skaterStats = await pool.query(
      "SELECT * FROM skater_stats WHERE nhl_id = $1",
      [nhl_id]
    );
    res.json(skaterStats.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//Add New tag

app.post("/tag", async (req, res) => {
  try {
    const { nhl_id, tag, author } = req.body;
    const newPlayer = await pool.query(
      "INSERT INTO tags (nhl_id, tag, author ) VALUES($1, $2, $3 ) RETURNING *",
      [nhl_id, tag, author]
    );

    res.json(newPlayer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//add New note

app.post("/note", async (req, res) => {
  try {
    const { nhl_id, note, author } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes (nhl_id, note, author ) VALUES($1, $2, $3 ) RETURNING *",
      [nhl_id, note, author]
    );

    res.json(newNote.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get tags

app.get("/tags/:nhl_id", async (req, res) => {
  try {
    const { nhl_id } = req.params;
    const tag = await pool.query("SELECT * FROM tags WHERE nhl_id = $1", [
      nhl_id,
    ]);
    res.json(tag.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get notes

app.get("/notes/:nhl_id", async (req, res) => {
  try {
    const { nhl_id } = req.params;
    const note = await pool.query("SELECT * FROM notes WHERE nhl_id = $1", [
      nhl_id,
    ]);
    res.json(note.rows);
  } catch (error) {
    console.error(error.message);
  }
});


//Add New comp

app.post("/comp", async (req, res) => {
  try {
    const { nhl_id, comp_nhl_id, comp_full_name, comp_position, author } = req.body;
    const newPlayer = await pool.query(
      "INSERT INTO comps (nhl_id, comp_nhl_id, comp_full_name, comp_position, author) VALUES($1, $2, $3, $4, $5 ) RETURNING *",
      [nhl_id, comp_nhl_id, comp_full_name, comp_position, author ]
    );

    res.json(newPlayer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});


//get comps

app.get("/comps/:nhl_id", async (req, res) => {
  try {
    const { nhl_id } = req.params;
    const comp = await pool.query("SELECT * FROM comps WHERE nhl_id = $1", [
      nhl_id,
    ]);
    res.json(comp.rows);
  } catch (error) {
    console.error(error.message);
  }
});


//delete comp

app.delete("/comp/:comp_db_id", async (req, res) => {
  try {
    const { comp_db_id } = req.params;
    const deletePlayer = await pool.query(
      "DELETE FROM comps WHERE comp_db_id = $1 RETURNING *",
      [comp_db_id]
    );
    res.json("comp " + comp_db_id + " deleted");
  } catch (error) {
    console.error(error.message);
  }
});





//delete note

app.delete("/note/:note_id", async (req, res) => {
  try {
    const { note_id } = req.params;
    const deletePlayer = await pool.query(
      "DELETE FROM notes WHERE note_id = $1 RETURNING *",
      [note_id]
    );
    res.json("note " + note_id + " deleted");
  } catch (error) {
    console.error(error.message);
  }
});

//delete note

app.delete("/tag/:tag_id", async (req, res) => {
  try {
    const { tag_id } = req.params;
    const deletePlayer = await pool.query(
      "DELETE FROM tags WHERE tag_id = $1 RETURNING *",
      [tag_id]
    );
    res.json("tag " + tag_id + " deleted");
  } catch (error) {
    console.error(error.message);
  }
});