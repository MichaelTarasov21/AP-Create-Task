const Domselectors =  {
    body: document.body
}
Domselectors.body.innerHTML = `<div id="starting_page"><h1>Guess the Number</h1><div id="intro_form"><p>Out of how much would you like to guess?</p><input class="num_input" id="maxnumber" type="number" min="2"><br><input type="checkbox" id="Limitoption"><label>Limit number of guesses</label><div id=guesslimitbox></div><input type="submit" value="Start the game" id="start_button"></div></div>`;
console.log("You suck")
