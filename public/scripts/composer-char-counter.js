$(document).ready(() => {

  const $textField = $('#text-input');
  let $counter = $('#counter');
  let counter = $counter.html();

  $textField.on('keydown', function(x) {
    if (x.which !== (8 || 46) && counter <= 140) {
      counter--;
    } else if (counter < 140) {
      counter++;
    }
    $counter.text(counter);

    if (counter < 0) {
      $counter.css("color", "red");
    } else $counter.css("color", "#321325");
  })
  const $submitTweet = $('.submit-tweet');

  $submitTweet.click(function(event) {
    if (counter >= 0) {
    counter = 140
    }
  })
});

