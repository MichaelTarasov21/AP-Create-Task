function CheckIfIntInput(UserInput) {
  const IntofInput = parseInt(UserInput);
  if (UserInput != IntofInput) {
    return false;
  } else {
    return true;
  }
}
export {CheckIfIntInput};