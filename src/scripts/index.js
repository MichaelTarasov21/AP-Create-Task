import { CheckIfIntInput } from "./intergercheck";
const Domselectors = {
  body: document.body,
}; // remember to remove if not used more often
function loadsettings() {
  let guesslimit;
  Domselectors.body.innerHTML = `<div id="starting_page"><h1>Guess the Number</h1><div id="intro_form"><p>Out of how much would you like to guess?</p><input class="num_input" id="maxnumber" type="number" min="2"><br><input type="checkbox" id="Limitoption"><label>Limit number of guesses</label><div id=guesslimitbox></div><br><input type="submit" value="Start the game" id="start_button"></div></div>`;
  document.getElementById("Limitoption").addEventListener("click", function () {
    if (document.getElementById("Limitoption").checked) {
      guesslimit = true;
      document.getElementById(
        "guesslimitbox"
      ).innerHTML = `<br>How man guesses do you want?<br><input class="num_input" id="guessamount" type="number" min="1">`;
    } else {
      guesslimit = false;
      document.getElementById("guesslimitbox").innerHTML = "";
    }
  });
  document
    .getElementById("start_button")
    .addEventListener("click", function () {
      const maxnumber = document.getElementById("maxnumber").value;
      if (!CheckIfIntInput(maxnumber) || maxnumber <= 1) {
        alert(
          "Please enter a whole number greater than 1 for the highest number you want to play"
        );
        return;
      }
      if (guesslimit) {
        const guessamount = document.getElementById("guessamount").value;
        console.log(guessamount);
        if (!CheckIfIntInput(guessamount) || guessamount <= 0) {
          alert(
            "Please enter a whole number greater than 0 for the maximum amount of guesses"
          );
          return;
        }
        startgame(maxnumber, guessamount);
      }
      startgame(maxnumber);
    });
}
function startgame() {}
loadsettings();
