import { CheckIfIntInput } from "./intergercheck";
const Domselectors = {
  body: document.body,
};
function loadsettings() {
  let guesslimit;
  Domselectors.body.innerHTML = `<div class="page"><h1>Guess the Number</h1><div id="intro_form"><p>Out of how much would you like to guess?</p><input class="num_input" id="maxnumber" type="number" min="2"><br><input type="checkbox" id="Limitoption"><label>Limit number of guesses</label><div id=guesslimitbox></div><br><input type="submit" value="Start the game" id="start_button"></div></div>`;
  document.getElementById("Limitoption").addEventListener("click", function () {
    if (document.getElementById("Limitoption").checked) {
      guesslimit = true;
      document.getElementById(
        "guesslimitbox"
      ).innerHTML = `<br>How many guesses do you want?<br><input class="num_input" id="guessamount" type="number" min="1">`;
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
        if (!CheckIfIntInput(guessamount) || guessamount <= 0) {
          alert(
            "Please enter a whole number greater than 0 for the maximum amount of guesses"
          );
          return;
        }
        startgame(maxnumber, guessamount);
        return;
      }
      startgame(maxnumber);
    });
}
function startgame(maxnumber, guessamount = 0) {
  const numbertoguess = Math.floor(Math.random() * maxnumber) + 1;
  console.log(numbertoguess);
  let guesses = [];
  let guesslimit = false;
  Domselectors.body.innerHTML = `<div class="page"><h2>I am thinking of a number between 1 and ${maxnumber}</h2><br><br><h3>Your Guess:</h3><input class="num_input" id="guess" type="number"><br><input type="submit" value="Guess" id="submitguess"><br><div id="tips"></div>`;
  if (guessamount !== 0) {
    guesslimit = true;
    document
      .getElementById("tips")
      .insertAdjacentHTML(
        "afterend",
        `<br></div><div id="guessesleft">Guess ${
          guesses.length + 1
        } of ${guessamount}</div>`
      );
  }
  document.getElementById("submitguess").addEventListener("click", function () {
    let guess = document.getElementById("guess").value;
    if (CheckIfIntInput(guess)) {
      guesses.push(guess);
      if (guess == numbertoguess) {
        document.body.innerHTML = `<div class="page"><h1>You Won</h1><br><h2>I was thinking of ${numbertoguess}</h2><br><div id="Guesses"></div></div>`;
        guesses.forEach(function (item, index) {
          if (item < numbertoguess) {
            document
              .getElementById("Guesses")
              .insertAdjacentHTML(
                "beforeend",
                `<br>${
                  index + 1
                }: You guessed ${item} and I told you that it was less than the number you had to guess<br>`
              );
          } else if (item > numbertoguess) {
            document
              .getElementById("Guesses")
              .insertAdjacentHTML(
                "beforeend",
                `<br>${
                  index + 1
                }: You guessed ${item} and I told you that it was greater than the number you had to guess<br>`
              );
          } else {
            document
              .getElementById("Guesses")
              .insertAdjacentHTML(
                "beforeend",
                `<br>${
                  index + 1
                }: You guessed ${item} and I told you that you won<br>`
              );
          }
        });
        return;
      } else if (guess > numbertoguess) {
        document.getElementById(
          "tips"
        ).innerHTML = `<h1>${guess} is greater than the number I am thinking of</h1>`;
      } else {
        document.getElementById(
          "tips"
        ).innerHTML = `<h1>${guess} is less than the number I am thinking of</h1>`;
      }
      if (guesslimit) {
        document.getElementById(
          "guessesleft"
        ).innerHTML = `</div><div id="guessesleft">Guess ${
          guesses.length + 1
        } of ${guessamount}</div>`;
        if (guesses.length == guessamount) {
          document.body.innerHTML = `<div class="page"><h1>You Lost</h1><br><h2>I was thinking of ${numbertoguess}</h2><br><div id="Guesses"></div></div>`;
          guesses.forEach(function (item, index) {
            if (item < numbertoguess) {
              document
                .getElementById("Guesses")
                .insertAdjacentHTML(
                  "beforeend",
                  `<br>${
                    index + 1
                  }: You guessed ${item} and I told you that it was less than the number you had to guess<br>`
                );
            } else {
              document
                .getElementById("Guesses")
                .insertAdjacentHTML(
                  "beforeend",
                  `<br>${
                    index + 1
                  }: You guessed ${item} and I told you that it was greater than the number you had to guess<br>`
                );
            }
          });
          document
            .getElementById("Guesses")
            .insertAdjacentHTML(
              "beforeend",
              `<br>And then you ran out of guesses`
            );
          return;
        }
      }
    } else {
      alert("Please guess a whole number");
    }
  });
}
loadsettings();
