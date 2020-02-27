/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  const displayName = escape(tweetObj.user.name);
  const avatar = tweetObj.user.avatar;
  const handle = escape(tweetObj.user.handle);
  const content = escape(tweetObj.content.text);
  const time = tweetObj.created_at;

  let $markup = ` <article class="tweet">
<header>
  <img src="${avatar}">
  <h3 class="display-name">${displayName}</h3>
  <h3 class="display-handle">${handle}</h3>
</header>

<div class="tweet-content">
  <P>${content}</P>
</div>

<footer>
  <p>${time}</p>
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

const renderTweets = function(tweetsArray) {
  for (let tweet of tweetsArray) {

    const $tweet = createTweetElement(tweet);
    // console.log($tweet);
    $('.tweet-container').prepend($tweet);
  }
};


$(document).ready(() => {
  const $tweetBox = $('.tweet');

  $tweetBox.on('mouseover', function() {
    $tweetBox.css('box-shadow', '20px 20px')
  })

  $tweetBox.on('mouseleave', function() {
    $tweetBox.css('box-shadow', 'none');
  })

  const $submitTweet = $('.submit-tweet');

  $submitTweet.click(function(event) {
    event.preventDefault();

    if ($('#text-input').val().length === 0) {
       
      $('#text-input').attr('placeholder', 'WRITE SOMETHING');
      $('#text-input').click(function() {
        $('#text-input').attr('placeholder', 'What are you humming about?')
      })
      return
    }
    if ($('#text-input').val().length > 140) {
      $('.new-tweet h2').text('TOO MANY CHARACTERS').css("color", "red");

      $('#text-input').click(function() {
        $('.new-tweet h2').text('Compose Tweet').css("color", "lavender");
      })
      return 
    }

    let $textInput = $('#text-input').serialize();

    $.ajax({
      type: 'POST',
      url: "/tweets",
      data: $textInput,
    })
      .then(loadTweets())
      .then($('#text-input').val(''));

  })

  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then((result) => renderTweets(result))
  }
  loadTweets();

  $('section.new-tweet').hide();

  $('#toggleTweet').click(function(){
    $('section.new-tweet').slideToggle();
    $('#text-input').focus();
  })

})