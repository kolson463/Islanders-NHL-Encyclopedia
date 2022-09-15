
import {useEffect} from React


 useEffect(() => {
  PlayerData()
}, [])



const PlayerData = async () => {

// for (let index = 1; index < 27; index++) {
//     const element = array[index];
    


    try {
      const res = await fetch(
        "https://statsapi.web.nhl.com/api/v1/teams/21/roster"
      );
      const teamData = await res.json();
    const name = await teamData.roster[0].person.fullName

      console.log(teamData.toString())
      console.log(typeof(teamData))
      console.log("Name: "+name)
    } catch (error) {
      console.error(error.message);
    }
  };





//}