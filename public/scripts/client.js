/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // escape function for text input
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Load Tweets
  const loadTweets = function () {
    $.ajax('/tweets/', { method: 'GET' })
      .then(function (tweets) {
        console.log('Success: ', tweets);
        renderTweets(tweets);
      });
  }

  // Render Tweets
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  // Create tweet element
  const createTweetElement = function (tweetObj) {
    const { name, avatars, handle } = tweetObj.user;
    const { text } = tweetObj.content;
    const createdAt = tweetObj.created_at;
    // escape user input text
    const escapedText = escape(text);
    // generate tweet element
    let $tweet = $(`
      <article class="tweet">
        <header>
          <div class="avatar-container">
            <img class="avatar" src="${avatars}" alt="${name}'s Avatar">
            <span class="handle">${name}</span>
          </div>
          <h2>${handle}</h2>
        </header>
        <div class="tweet-text">${escapedText}</div>
        <footer>
          <div class="timestamp">${timeago.format(createdAt)}</div>
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



  // Form Submission Handling
  $('form.new-tweet').on("submit", function (event) {
    const formData = $(this).serialize();
    event.preventDefault();

    // hide error when form is submitted
    $('.error-container').slideUp();

    if ($('.counter').val() < 0) {
      // Display the error message using jQuery
      $('.error-message').text('Tweet is too long!');
      $('.error-container').slideDown();
    } else if (formData === "text=") {
      $('.error-message').text('Tweet is empty!');
      $('.error-container').slideDown();
    }
    // Post the tweet
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: formData
    })
      .done(function () {
        // If the tweet is successfully posted, empty and reload the tweets
        $('#tweet-text').val('');
        $('.counter').val(140);
        loadTweets();
      })
  });
});