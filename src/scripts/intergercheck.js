function CheckIfIntInput(UserInput, InvertResults = false) {
  const IntofInput = parseInt(UserInput);
  let result
  if (InvertResults){
  if (UserInput != IntofInput) {
    result = true;
  } else {
    result = false;
  }
} else {
  if (UserInput != IntofInput) {
    result = false;
  } else {
    result = true;
  }
}
  return result
}
export {CheckIfIntInput};