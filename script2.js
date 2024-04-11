const endpoint = 'https://api.github.com';
const loginCont = document.querySelector('#login');
const followerNum = document.querySelector('#follower-num');
const followingNum = document.querySelector('#following-num');
const repoNum = document.querySelector('#repo-num');
const starredNum = document.querySelector('#starred-num');
const profilePic = document.querySelector('#profile-pic');
const user = fetch(`${endpoint}/users`)
  .then((response) => response.json())
  .then((users) => {
    const randIndex = Math.floor(Math.random() * users.length);
    return users[randIndex];
  })
  .catch((error) => console.error('Error fetching users:', error));

user.then((user) => {
  profilePic.src = user.avatar_url;
  loginCont.textContent = user.login;
});
user
  .then((user) => {
    return fetch(user.followers_url);
  })
  .then((resp) => resp.json())
  .then((followers) => {
    followerNum.textContent = followers.length;
  });
user
  .then((user) => {
    return fetch(`${endpoint}/users/${user.login}/following`);
  })
  .then((resp) => resp.json())
  .then((following) => {
    followingNum.textContent = following.length;
  });
user
  .then((user) => {
    return fetch(user.repos_url);
  })
  .then((resp) => resp.json())
  .then((repos) => {
    repoNum.textContent = repos.length;
  });
user
  .then((user) => {
    return fetch(`${endpoint}/users/${user.login}/starred`);
  })
  .then((resp) => resp.json())
  .then((starred) => {
    starredNum.textContent = starred.length;
  });
