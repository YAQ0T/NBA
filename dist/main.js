$("#button").on("click", function () {
  $(".teamArea").empty();
  let input = $("#search").val();
  $.get(`/${input}`, function (npaPlayer) {
    console.log(npaPlayer);
    for (let i = 0; i < npaPlayer.length; i++)
      $(".teamArea").append(
        `<div><div>${
          npaPlayer[i].firstName + " " + npaPlayer[i].lastName
        }</div> <div> ${
          npaPlayer[i].jersey
        }</div>  <img src=https://nba-players.herokuapp.com/players/${
          npaPlayer[i].lastName
        }><div>${npaPlayer[i].pos}</div></div>`
      );
  });
});
