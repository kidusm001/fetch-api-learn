const apiUrl = 'https://my-json-server.typicode.com/kidusm001/fetch-api-learn';
const list = document.querySelector('ul.list');
const addForm = document.querySelector('#add-todo');

const getTodo = () => {
  fetch(`${apiUrl}/todos`)
    .then((resp) => resp.json())
    .then((todos) => {
      todos.forEach((todo) => {
        addTodoToDOM(todo);
      });
    })
    .catch((error) => console.log(`error: `, error));
};

function addTodoToDOM(todo) {
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
  li.setAttribute('data-id', todo.id);
  li.classList.add('item');
  list.appendChild(li);
}

const addTodo = (e) => {
  e.preventDefault();
  const todo = {
    body: e.target.firstElementChild.value,
    completed: false,
  };
  fetch(`${apiUrl}/todos`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => addTodoToDOM(data));
};
let todo = {
  body: 'Test 1',
  completed: true,
};

const toggleCompleted = (e) => {
  if (e.target.classList.contains('item')) {
    const checkbox = e.target.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    updateTodo(e.target.dataset.id, checkbox.checked);
  }
};
const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  }).then((resp) => resp.json());
};
const deleteTodo = (e) => {
  if (e.target.classList.contains('item')) {
    const id = e.target.dataset.id;
    fetch(`${apiUrl}/todos/${id}`, {
      method: 'DELETE',
    })
      .then((resp) => resp.json())
      .then(() => e.target.remove());
  }
};

const todoUpdate = async (e) => {
  try {
    if (e.target.classList.contains('item')) {
      const checkbox = e.target.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
      const response = await fetch(`${apiUrl}/todos/${e.target.dataset.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          completed: checkbox.checked,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('Something went wrong');
      }
    }
  } catch (error) {
    console.log('error: ', error);
  }
};

function init() {
  document.addEventListener('DOMContentLoaded', getTodo);
  addForm.addEventListener('submit', addTodo);
  list.addEventListener('click', todoUpdate);
  list.addEventListener('dblclick', deleteTodo);
}
init();
