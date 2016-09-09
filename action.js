var db,soundLabel;
var sound_file = new Howl({
  src: ['phonics.mp3','phonics.wav'],
  sprite: {
    IY: [0, 470],
    IH: [2280,410],
    UH: [4430,500],
    UW: [6720,790],
    EH: [9220,360],
    AH: [11390,380],
    ER: [13590,570],
    AO: [15970,610],
    AE: [18370,390],
    AA: [25130,400],
    EY: [29640,540],
    OY: [34320,550],
    OW: [36680,600],
    AY: [41400,610],
    AW: [43810,500],
    P:  [46130,300],
    B:  [48240,330],
    T:  [50370,390],
    D:  [52550,400],
    CH: [54770,430],
    JH: [57010,490],
    K:  [59290,340],
    G:  [61430,370],
    F:  [63600,570],
    V:  [65970,650],
    TH: [68430,740],
    DH: [70930,480],
    S:  [73210,800],
    Z:  [75790,730],
    SH: [78320,520],
    ZH: [80640,540],
    M:  [82960,630],
    N:  [85400,600],
    NG: [87810,710],
    HH: [90320,460],
    L:  [92590,430],
    R:  [94810,550],
    W:  [97170,430],
    Y:  [99390,510]
  }
});

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
 //empty the text over the button
  $(".js-word").empty();
  //convert the word into lowercase
  word = word.toLowerCase();

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
        createButton(db[word].chunks[item],db[word].phones[item],item);
        //create text over the buttons
        $(".js-word").append("<span class='text p_"+item+"'>"+db[word].chunks[item]+"</span>");
      }
    }
    else {
      alert ("Enter a valid word");
    }
}

function createButton(phoneme, sound, item) {
  //create a button with text, className: 'phoneme' and click handler
    sound = sound.toUpperCase();
    var button = $('<button class="phoneme">');
    button.text(phoneme);
    button.click(function(){
      sound_file.play(sound);
      //console.log();
      $('.text').toggleClass("highlight",false);
      $(".p_"+item).toggleClass("highlight");
      /*sound_file.currentTime = start_time;
      console.log(sound_file.currentTime);
      sound_file.play();
      setTimeout(sound_file.pause(),duration);*/
    });


  //append the button to the phonemes
  $('.js-phonemes').append(button);
}
