'use strict';

// put the date on the page
let date = new Date();
let formatDate = date.toDateString();
let today = document.getElementById('date');
today.innerHTML = formatDate;

let todoItems = [];

let itemId = 0;
function makeId() {
    itemId++;
    return itemId;
};

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: makeId()
    };

    todoItems.push(todo);
    console.log('todoItems: ', todoItems);
    const list = document.getElementById('todo-list');
    list.insertAdjacentHTML('beforeend', `
        <li class='todo-item' data-key='${todo.id}'>
            <input id='${todo.id}' type='checkbox' />
            <label for='${todo.id}' class='tick'></label>
            <span>${todo.text}</span>
            <button class='delete-todo'>Delete</button>        
        </li>
    `);
    list.addEventListener('click', e => {
        if (e.target.classList.contains('tick')) {
            console.log('itemKey: ', itemKey)
            const itemKey = e.target.parentElement.dataset.key;
            toggleDone(itemKey);
        };

        if (e.target.classList.contains('delete-todo')) {
            const itemKey = e.target.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
    });
};

function toggleDone(key) {
    console.log("key: ", key)
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;

    const item = document.querySelector(`[data-key='${key}']`);
    if (todoItems[index].checked) {
        item.classList.add('done');
    } else {
        item.classList.remove('done');
    }
}

function deleteTodo(key) {
    console.log('delete key: ', key)
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
}

const form = document.getElementById('todo-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const todoText = input.value.trim();

    if (todoText.length !== '') {
        addTodo(todoText);
        input.value = '';
        input.focus();
    }
});

let order = document.getElementById('order');
order.innerHTML = 'Go kick rocks';