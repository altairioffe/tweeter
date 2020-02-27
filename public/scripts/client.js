/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetObj) {
  // console.log(1, tweetObj.user)
  const displayName = tweetObj.user.name;
  const avatar = tweetObj.user.avatar;
  const handle = tweetObj.user.handle;
  const content = tweetObj.content.text;
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

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];
 
  const $submitTweet = $('.submit-tweet');

  $submitTweet.click(function(event) {
    event.preventDefault();

    if ($('#text-input').val().length === 0) {
      return alert('WRITE SOMETHING');
    }
    if ($('#text-input').val().length > 140) {
      return alert('TOO MANY CHARACTERS');
    }

    let $textInput = $('#text-input').serialize();

    $.ajax({
      type: 'POST',
      url: "/tweets",
      data: $textInput,
    })
    .then(loadTweets())

    
  })

  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', {method: 'GET'})
    .then((result) => renderTweets(result))
  }
  loadTweets();


})