$(document).ready(function() {
  console.log('Document ready!');
   // clear the textarea on page load
  $('#tweet-text').val('');
  $('.new-tweet textarea').on('input', function() {
    const input = this.value;
    const inputLength = input.length;
    const charsLeft = 140 - inputLength;
    // finds the 'counter' element in the DOM
    const counter = $(this).parent().find(".counter");
    // updates the counter with the remaining characters
    counter.text(charsLeft);
    // if the remaining characters is less than 0, the counter turns red
    if (charsLeft < 0) {
      $('.counter').css("color", "red");
    }


  });

});