var db,soundLabel
var src = "phonics.mp3"
$(document).ready(function(){
  //parse the JSON data Wait for the application to launch
  $.getJSON("sampledb.json", function(temp_db){db=temp_db;});
  $.getJSON("timeLabel.json", function(temp_soundLabel){soundLabel=temp_soundLabel;});
  //On form submit
  $('.form').on('submit', function(e){
    // to prevent default form submit action
    e.preventDefault();
    // get input value and trim white spaces to left and right if any
    var inputValue = $('#word').val().trim();
    // check if inputValue is not empty
    if(inputValue){
      chunk(inputValue);
    }else{
      alert("Enter A Word");
    }
  });

});

function chunk(word) {
  //empty the buttons of letters of previous word
  $('.js-phonemes').empty();
  //convert the word into lowercase
  word = word.toLowerCase();
  $(".js-word").text(word);

  //show loading text
  $('.js-phonemes').text('Loading Please Wait!...');

  //parse the sampledb.json file
    // remove loading text
    $('.js-phonemes').text('');
    //for each phoneme in the word
    //check if word is in our db if not throw error
    if (typeof db[word] != "undefined") {
      for (var item in db[word].chunks) {
        //create a button. pass each item in chunks and phones as argument
        createButton(db[word].chunks[item],db[word].phones[item]);
      }
    }
    else {
      alert ("Enter a valid word");
    }
}

function createButton(phoneme, sound) {
  //create a button with text, className: 'phoneme' and click handler
  button = $('.js-phonemes').append("<button class='phoneme' id="+phoneme+">"+phoneme+"</button>");
  $('#'+phoneme).on('click',function(){
    sound.toUpperCase();
    start_time = soundLabel[sound][0].start_time;
    end_time = soundLabel[sound][0].end_time;
    var sound_file = new Audio(src+"#t="+ start_time +"," + end_time );
    sound_file.play();
  });
  //append the button to the phonemes
  $('.js-phonemes').append(button);
}
