function chunk() {
  //empty the phonemeDiv of previous buttons
  var phonemeDiv = document.getElementsByClassName('phonemeDiv')[0];
  phonemeDiv.innerHTML ="";

  //read the word from the input box
  var word= document.getElementById('word').value;
  //convert the word into lowercase
  word = word.toLowerCase();
  //parse the sampledb.json file
  $.getJSON("sampledb.json", function(db){
    //for each phoneme in the word
    for (var item in db[word].chunks) {
      //create a button. pass each item in chunks and phones as argument
      createButton(db[word].chunks[item],db[word].phones[item]);
    }
  });
}

function createButton(phoneme, sound) {
  //create a button
  var button = document.createElement("button");
  button.innerHTML = phoneme;
  button.className = "phoneme";
  //append the button to the phonemeDiv
  var phonemeDiv = document.getElementsByClassName('phonemeDiv')[0];
  phonemeDiv.appendChild(button);

  //add event handler for each button
  button.addEventListener("click",function(){
    //play sound
    alert (sound);
  });
}
