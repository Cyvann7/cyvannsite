var alertbox = document.getElementById("alertBox")
  

//Set Word
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
var word = wordlist[getRandomInt(wordlist.length)]

//vars
var cg = -1; //current guess
var guessesElement = [];
var guesses = [];
var guessString = new String("");

//put guess elements into array
for(let l=1;l<7;l++){guessesElement[l-1]=document.getElementById("guess"+l)}

//Enter pressed in guess box
function enterPressed(event) {
  if (event.keyCode == 13 && document.getElementById("guessinput").value.length==5){
    if ((validwords.includes(document.getElementById("guessinput").value)) || (wordlist.includes(document.getElementById("guessinput").value)))
      {
      alertbox.innerHTML = "Guess A Word!"
      takeguess()
      document.getElementById("guessinput").value = ""
    } else alertbox.innerHTML = "Please Enter A Real Word!"

  }
}

//Take a guess
function takeguess()
{
  //Check if word is correct
  if (document.getElementById("guessinput").value == word) {
    alertbox.innerHTML = '<span style="color: springgreen;"> You Win'
    setTimeout(() => window.location.reload(), 2000)
  }

  if(cg < 5){
    guesses.push(document.getElementById("guessinput").value.toLowerCase())
    cg++
    guessString = ""
    for(let i = 0; i<5; i++){ 
      if(word.includes(guesses[cg][i]))
        if(word[i] == guesses[cg][i])
          //Correct, in place
          guessString += '<span style="color: springgreen;"><b>' + guesses[cg][i] + '</b></span>'
        else 
          //Correct, out of place 
          guessString += '<span style="color: orange;"><i>' + guesses[cg][i] + '</i></span>'
      else 
      //Incorrect
      guessString += '<span style="color: red;">' + guesses[cg][i] + '</span>'
    }

    //Display guess back to player
    guessesElement[cg].innerHTML = guessString
  }

  //Check if player has lost
  if(document.getElementById("guessinput").value != word && cg == 5){
    alertbox.innerHTML = '<span style="color: red;"> You Lose, The Word Was: ' + word + '</span>'
    setTimeout(() => window.location.reload(), 2000)
  }
};
