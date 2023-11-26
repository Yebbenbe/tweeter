/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Things we need from object:
// name, avatars, user handle (header)
// tweet content
// date created (footer)
// use this syntax const $tweet = $(`<article class="tweet">Hello world</article>`);

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function () {

  const createTweetElement = function (tweetObj) {
    // create constants from object
    const { name, avatars, handle } = tweetObj.user;
    const { text } = tweetObj.content;
    const createdAt = tweetObj.created_at;

    let $tweet = $(`
    <article class="tweet">
      <header>
        <div class="avatar-container">
          <img class="avatar" src="${avatars}" alt="${name}'s Avatar">
          <span class="handle">${name}</span>
        </div>
        <h2>${'@' + handle}</h2>
      </header>
      <div class="tweet-text">${text}</div>
      <footer>
        <div class="timestamp">${createdAt}</div>
        <div class="actions">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-repeat"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `);


    return $tweet;
  }

  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  }

  renderTweets(data);

});