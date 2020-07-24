// Will render if logged in
// 1. Get username, render to page
// 2. Get profile image source, render to page
// 3. Get social media links (don't display anything if none), render to page
// 4. polls voted on count, render to page
// 5. polls created count, render to page
// 6. Get polls created and render to page

// elements
const usernameField = document.querySelector('#username');
const pollsVotedField = document.querySelector('#polls-voted');
const pollsCreatedField = document.querySelector('#polls-created');

const username = 'testuser'
const password = 'testpassword'
const img = '../img/avatar.svg';
const data = {username: username, password: password, img: img}

usernameField.innerText = `Username: ${username}`