const posts = [
  { title: 'Post one', body: 'This is body of one' },
  { title: 'Post two', body: 'This is body of two' },
];

function createPost(post) {
  return new Promise((resolve, reject) => {
    let error = false;

    setTimeout(() => {
      if (!error) {
        posts.push(post);
        resolve(post);
      } else {
        reject('Lol😂😂😂🤣');
      }
    }, 2000);
  });
}

function getPost() {
  setTimeout(() => {
    posts.forEach((post) => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${post.title}</strong><p>${post.body}</p>`;
      document.querySelector('#post').appendChild(div);
    });
  }, 1000);
}

createPost({ title: 'Post three', body: 'This is body of three' })
  .then((post) => {
    const div = document.createElement('div');
    div.innerHTML = `The added <strong>${post.title}</strong><p>${post.body}</p>`;
    document.querySelector('#post').appendChild(div);
    return post.title;
  })
  .then((title) => {
    const div = document.createElement('div');
    div.innerHTML = `The added <strong>${title}</strong>`;
    document.querySelector('#post').appendChild(div);
  })
  .then(getPost)
  .catch((error) => {
    const h2 = document.createElement('h2');
    h2.innerHTML = `${error}`;
    document.querySelector('#post').appendChild(h2);
  });
