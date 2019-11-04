'use strict'
console.log('Lady and Ralphie Jr. are awesome!');

let today = new Date();
let formatDate = today.toDateString();
let selectDate = document.getElementById('date');
selectDate.innerHTML = formatDate;

let todoItems = [];

let currentId = 0;
function makeId() {
    currentId++;
    return currentId;
}

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: makeId(),
    };

    todoItems.push(todo);
    console.log('todoItems: ', todoItems);
    const list = document.querySelector('.js-todo-list');
    list.insertAdjacentHTML('beforeend', `
        <li class='todo-item' data-key='${todo.id}'>
            <input id='${todo.id}' type='checkbox'/>
            <label for='${todo.id}' class='tick js-tick'></label>
            <span>${todo.text}</span>
            <button class='delete-todo js-delete-todo'>
                <svg><use href='#delete-icon'></use></svg>
            </button>
        </li>    
        `);
    list.addEventListener('click', e => {
        if (e.target.classList.contains('js-tick')) {
            const itemKey = e.target.parentElement.dataset.key;
            toggleDone(itemKey);
        };

        if (e.target.classList.contains('js-delete-todo')) {
            const itemKey = e.target.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
    });
};

// receives key of list item that was checked or unchecked
// finds the corresponding entry in the [todoItems] using find index
// toggle the value of the checked property to the opposite value
// add or remove the .done class from the item depending on its status
// the .done class has the effect of striking out the text and showing a checkmark

function toggleDone(key) {
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
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();

    // select the list element and trim all whitespace once there are no todo items left
    const list = document.querySelector('.js-todo-list');
    if (todoItems.length === 0) {
        list.innerHTML = '';
    }
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.querySelector('.js-todo-input');
    const text = input.value.trim();

    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

let order = "Go kick rocks!";
let orderLocation = document.getElementById('rocks');
orderLocation.innerHTML = order;