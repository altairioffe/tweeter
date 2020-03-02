/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Escape function for user input
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creates a new tweet
const createTweetElement = function(tweetObj) {
  const displayName = escape(tweetObj.user.name);
  const avatar = tweetObj.user.avatars;
  const handle = escape(tweetObj.user.handle);
  const content = escape(tweetObj.content.text);
  let time = Math.floor(tweetObj.created_at / 3600000);
  let units = 'hours';

  if (time > 48) {
    time = Math.floor(time / 24);
    units = 'days';
  }

  let $markup = `
<article class="tweet">
<header>
  <img src="${avatar}">
  <h3 class="display-name">${displayName}</h3>
  <h3 class="display-handle">${handle}</h3>
</header>

<div class="tweet-content">
  <P>${content}</P>
</div>

<footer>
  <p>posted ${time} ${units} ago</p>
  <div> 
  <i class="material-icons">favorite_border</i>
  <i class="material-icons">cached</i>
  <i class="material-icons">outlined_flag</i>
  </div>
</footer>
</article>
`;
  return $markup;
};

const renderNewTweet = function(tweet) {
  const $tweet = createTweetElement(tweet);
  $('.tweet-container').prepend($tweet);
}

const renderTweets = function(tweetsArray) {

  for (let tweet of tweetsArray) {
    renderNewTweet(tweet);
  }
};

$(document).ready(() => {

  const $submitTweet = $('.submit-tweet');

  $submitTweet.click(function(event) {

    event.preventDefault();

// ERROR Message for empty tweet:
    if ($('#text-input').val().length === 0) {
      $('#text-input').attr('placeholder', 'WRITE SOMETHING');
      $('#text-input').click(function() {
        $('#text-input').attr('placeholder', 'What are you humming about?');
      })
      return;
    }
// ERROR Message for long tweet:
    if ($('#text-input').val().length > 140) {
      $('.new-tweet h2').text('TOO MANY CHARACTERS').css("color", "red");

      $('#text-input').click(function() {
        $('.new-tweet h2').text('Compose Tweet').css("color", "lavender");
      });
      return;
    }

    // POSTS new tweet & resets input form:
    let $textInput = $('#text-input').serialize();

    $.ajax({
      type: 'POST',
      url: "/tweets",
      data: $textInput,
    })
      .then(loadNewTweet())
      .then($('#text-input').val(''))
      .then($('#counter').text(140))
  })

  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then((result) => renderTweets(result))
  }

  const loadNewTweet = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then((result) => renderTweets(result[result.length-1]))
  }

  loadTweets();

  //Toggles input form:
  $('section.new-tweet').hide();
  $('#toggleTweet').click(function() {
    $('section.new-tweet').slideToggle();
    $('#text-input').focus();
  })
})