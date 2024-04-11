const apiUrl = 'https://my-json-server.typicode.com/kidusm001/fetch-api-learn';
const list = document.querySelector('ul.list');

const getTodo = () => {
  fetch(`${apiUrl}/todos`)
    .then((resp) => resp.json())
    .then((todos) => {
      todos.forEach((todo) => {
        const item = todo.body;
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.classList = 'item';
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        if (todo.completed) {
          checkbox.checked = true;
        }
        span.appendChild(document.createTextNode(item));
        li.appendChild(span);
        li.appendChild(checkbox);
        list.appendChild(li);
      });
    })
    .catch((error) => console.log(`error: `, error));
};

const addTodo = (todo) => {
  fetch(`${apiUrl}/todos`);
};

getTodo();
