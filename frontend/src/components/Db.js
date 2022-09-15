import { useEffect } from "react";

const Db = () => {
  var idsArray = [],
    player_position = "",
    player_first_name = "",
    player_last_name = "",
    player_team = "",
    player_age = "",
    player_shoots = "",
    nhl_link = "",
    player_height = "",
    player_weight = "",
    player_full_name = "";

  const getIds = async () => {
    //parse rosters for player ids

    for (let index = 1; index < 56; index++) {
      //56
      if ((index === 11) | (index === 27) || (index > 30 && index < 52)) {
        continue;
      }

      try {
        const res = await fetch(
          "https://statsapi.web.nhl.com/api/v1/teams/" + index + "/roster"
        );
        const teamData = await res.json();

        var stringRosterData = JSON.stringify(teamData.roster);

        var rosterArray = await JSON.parse(stringRosterData);

        await rosterArray.forEach((player) => {
          idsArray.push(player.person.id);
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    console.log("ID Array Length: " + idsArray.length);

    //parse ids to get player bio info

    for (let i = 0; i < idsArray.length; i++) {
      //idsArray.length
      var nhl_id = idsArray[i];
      try {
        console.log("id dl: " + nhl_id);
        const res = await fetch(
          "https://statsapi.web.nhl.com/api/v1/people/" + nhl_id
        );
        const playerData = await res.json();

        var stringPlayerData = JSON.stringify(playerData.people);
        //console.log("string " + stringPlayerData);

        var playerArray = await JSON.parse(stringPlayerData);

        //console.log("playerArray" + playerArray);

        await playerArray.forEach((player) => {
          player_position = player.primaryPosition.abbreviation;
          player_first_name = player.firstName;
          player_last_name = player.lastName;
          player_team = player.currentTeam.id.toString();
          player_age = player.currentAge.toString();
          player_shoots = player.shootsCatches;
          player_height = player.height;
          player_weight = player.weight.toString();
          nhl_link =
            "https://www.nhl.com/player/" +
            player_first_name +
            "-" +
            player_last_name +
            "-" +
            idsArray[i];
          player_full_name = player.firstName + " " + player.lastName;
        });
      } catch (error) {
        console.error(error.message);
      }

      //post player bio info to players db

      //for (let i = 0; i < 1; i++) { // ids array.length
      try {
        //var nhl_id = idsArray[i];

        console.log("id to db " + nhl_id);
        const body = {
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
        };
        console.log(body);
        const response = await fetch("http://localhost:5000/players_ids", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        //console.log(response);
        console.log("index: " + i + " id: " + nhl_id);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const getGoalieIds = async () => {
    //parse rosters for goalie ids

    for (let index = 1; index < 56; index++) {
      //56
      if ((index === 11) | (index === 27) || (index > 30 && index < 52)) {
        continue;
      }

      try {
        const res = await fetch(
          "https://statsapi.web.nhl.com/api/v1/teams/" + index + "/roster"
        );
        const teamData = await res.json();

        var stringRosterData = JSON.stringify(teamData.roster);

        var rosterArray = await JSON.parse(stringRosterData);

        await rosterArray.forEach((player) => {
          if (player.position.code === "G") {
            idsArray.push(player.person.id);
            console.log("players: " + player.person.fullName);
          }
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    //get Stats for 2122

    for (let i = 0; i < idsArray.length; i++) {
      //idsArray.length
      var year = "2122";
      var nhl_id = idsArray[i];
      for (let index = 0; index < 3; index++) {
        console.log("Loop " + index);
        var yearString = "20212022";
        if (index === 1) {
          yearString = "20202021";
          year = "2021";
        } else if (index === 2) {
          yearString = "20192020";
          year = "1920";
        }

        var games_played = 0,
          games_started = 0,
          wins = 0,
          losses = 0,
          overtime = 0,
          shutouts = 0,
          save_percentage = "NA",
          goals_against_average = "NA";

        try {
          console.log("id dl: " + nhl_id);
          const res = await fetch(
            "https://statsapi.web.nhl.com/api/v1/people/" +
              nhl_id +
              "/stats?stats=statsSingleSeason&season=" +
              yearString
          );
          const playerData = await res.json();

          var stringPlayerData = JSON.stringify(playerData.stats[0].splits);
          //console.log("string " + stringPlayerData);

          var playerArray = await JSON.parse(stringPlayerData);

          //console.log("playerArray" + playerArray);

          await playerArray.forEach((player) => {
            games_played = parseInt(player.stat.games);
            games_started = parseInt(player.stat.gamesStarted);
            wins = parseInt(player.stat.wins);
            losses = parseInt(player.stat.losses);
            overtime = parseInt(player.stat.ot);
            shutouts = parseInt(player.stat.shutouts);
            save_percentage = player.stat.savePercentage;
            goals_against_average = player.stat.goalAgainstAverage;
          });
        } catch (error) {
          console.error(error.message);
        }

        try {
          //var nhl_id = idsArray[i];

          console.log("id to Goalie Stats " + nhl_id);
          const body = {
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
          };
          console.log(body);
          const response = await fetch("http://localhost:5000/goalie_stats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          console.log(response);
          console.log("index: " + i + " id: " + nhl_id);
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  };

  const getSkaterIds = async () => {
    //parse rosters for skater ids

    for (let index = 1; index < 56; index++) {
      //56
      //56
      if ((index === 11) | (index === 27) || (index > 30 && index < 52)) {
        continue;
      }

      try {
        const res = await fetch(
          "https://statsapi.web.nhl.com/api/v1/teams/" + index + "/roster"
        );
        const teamData = await res.json();

        var stringRosterData = JSON.stringify(teamData.roster);

        var rosterArray = await JSON.parse(stringRosterData);

        await rosterArray.forEach((player) => {
          if (player.position.code !== "G") {
            idsArray.push(player.person.id);
            console.log("players: " + player.person.fullName);
          }
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    //get Stats for 1920-2122

    for (let i = 0; i < idsArray.length; i++) {
      //idsArray.length
      var year = "2122";
      var nhl_id = idsArray[i];
      for (let index = 0; index < 3; index++) {
        console.log("Loop " + index);
        var yearString = "20212022";
        if (index === 1) {
          yearString = "20202021";
          year = "2021";
        } else if (index === 2) {
          yearString = "20192020";
          year = "1920";
        }

        var games = 0,
          points = 0,
          goals = 0,
          assists = 0,
          plus_minus = "NA",
          time_on_ice_per_game = "NA",
          penalty_minutes = "NA",
          hits = 0,
          shot_pct = "NA";

        try {
          console.log("id dl: " + nhl_id);
          const res = await fetch(
            "https://statsapi.web.nhl.com/api/v1/people/" +
              nhl_id +
              "/stats?stats=statsSingleSeason&season=" +
              yearString
          );
          const playerData = await res.json();

          var stringPlayerData = JSON.stringify(playerData.stats[0].splits);
          //console.log("string " + stringPlayerData);

          var playerArray = await JSON.parse(stringPlayerData);

          //console.log("playerArray" + JSON.stringify(playerArray[0].stat));

          await playerArray.forEach((player) => {
            //console.log("player" +player)
            games = parseInt(player.stat.games);
            //console.log("games:"+games)
            points = parseInt(player.stat.points);
            goals = parseInt(player.stat.goals);
            assists = parseInt(player.stat.assists);
            plus_minus = player.stat.plusMinus;
            time_on_ice_per_game = player.stat.timeOnIcePerGame;
            penalty_minutes = player.stat.penaltyMinutes;
            shot_pct = player.stat.shotPct;
            hits = parseInt(player.stat.hits);
          });
        } catch (error) {
          console.error(error.message);
        }

        console.log("Goals " + goals);

        try {
          const body = {
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
          };
          console.log("Body id: " + body.nhl_id);
          const response = await fetch("http://localhost:5000/skater_stats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          console.log(response);
          //console.log("index: " + i + " id: " + nhl_id);
        } catch (error) {
          console.error(error.message);
        }
      }
    }


  };

  return (
    <div className="container ">
      <button onClick={() => getIds()}>Parse roster</button>

      <button onClick={() => getGoalieIds()}>Goalie Stats</button>

      <button onClick={() => getSkaterIds()}>Skater Stats</button>

      <a href="https://www.capfriendly.com/browse/free-agents" target="_blank">
        Link to Cap Friendly for Notable Free Agents
      </a>
    </div>
  );
};

export default Db;
