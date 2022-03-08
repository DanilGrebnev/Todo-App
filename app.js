//Global 
const todoList = document.querySelector('#todo-list');
const userSelect = document.querySelector('#user-todo');
const form = document.querySelector('form');
let todos=[];
let users = [];


//AttachEvents
document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSubmit)

//Create User option
function createUserOption(user){
const option = document.createElement('option');
option.value = user.id;
option.innerText = user.name;

userSelect.append(option)
}

//Basic logic
function getUserName(userId){
const user = users.find(u => u.id === userId);
return user.name;
}
function printTodo({id, userId, title, completed}){
const li = document.createElement('li');
li.className ='todo-item';
li.dataset.id=id;
li.innerHTML = `<span>${title} <b>${getUserName(userId)}</b></span>`;


const status = document.createElement('input');
status.type ='checkbox';
status.checked = completed; 
const close = document.createElement('span');
close.innerHTML ='&times;';
close.className ='close';

li.prepend(status);
li.append(close);


todoList.prepend(li);
}


//Event logic
function initApp(){
    Promise.all([getAllTodos(), getAllUsers()]).then(values => 
        {[todos, users] = values;
     //Отправить в разметку
     todos.forEach(todo => printTodo(todo));
        users.forEach(user => createUserOption(user))
    })
}

function handleSubmit(event){
    event.preventDefault();
    createTodo({
        userId: form.user.value,
        title: form.todo.title,
        completed: false,
    });
}

//Создание асинхронных функций async logic
async function getAllTodos(){
const response = await fetch('https://jsonplaceholder.typicode.com/todos');
const data = await response.json();
return data;
}

async function getAllUsers(){
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
    }

async function createTodo(todo){
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', ({
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            "content-Type": "application/json",
        },

    }));

    const todo = await response.json(); 
    
    printTodo(todo);
}

