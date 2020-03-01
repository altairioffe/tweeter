$(document).ready(() => {

  const $textField = $('#text-input');
  let $counter = $('#counter')

  let counter = 140;

  $textField.on('keydown', function(x) {

    if (x.which !== (8 || 46) && counter <= 140) {
      counter--;
    } else if (counter < 140) {
      counter++;
    }
    $counter.text(counter);

    if (counter < 0) {
      $counter.css("color", "red");
    } else $counter.css("color", "lavender");
  })

  


})

