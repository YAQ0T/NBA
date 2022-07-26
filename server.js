const express = require("express");
const app = express();

const path = require("path");

const axios = require("axios").default;
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

let NPA_ARRAY_PLAYER = [];
const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756",
};
let notFilterdArray = [];
axios
  .get("http://data.nba.net/10s/prod/v1/2018/players.json")
  .then((res) => {
    notFilterdArray = res.data.league.standard;
  })
  .catch((err) => {
    console.error(err);
  });

function getPlayer(team) {
  NPA_ARRAY_PLAYER = [];
  for (let i = 0; i < notFilterdArray.length; i++) {
    if (
      notFilterdArray[i].teamId == teamToIDs[team] &&
      notFilterdArray[i].isActive == true
    ) {
      NPA_ARRAY_PLAYER.push(notFilterdArray[i]);
    }
  }
}

const port = 3001;
app.get("/", (req, res) => {
  res.send("hi");
});
app.get("/:team", (req, res) => {
  getPlayer(req.params.team);
  res.send(NPA_ARRAY_PLAYER);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
