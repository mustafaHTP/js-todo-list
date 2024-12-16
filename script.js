const EMPTY_STRING = '';
const TODOS_KEY = 'todos'

updateTodoListElement();


function getTodoListFromStorage(){
    const todosJson = localStorage.getItem(TODOS_KEY);
    if(!todosJson){
        console.log('todos not found in local storage');

        return  createTodosOnStorage();
    }

    const todos = JSON.parse(todosJson);

    return todos;
}

function saveTodos(todos){
    const todosJson = JSON.stringify(todos);
    localStorage.setItem(TODOS_KEY, todosJson);
}

function createTodosOnStorage(){
    const todos = [];
    const todosJson = JSON.stringify(todos);
    localStorage.setItem(TODOS_KEY, todos);

    return todos;
}


function handleKeyDown(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

function addTodo() {
    //get todo input element
    const todoInputElement = document.getElementById('todo-name-input');
    if (!todoInputElement) {
        console.log('Element has id named todo-input not found');
    }

    //get todo input value
    const todoInput = todoInputElement.value;
    //check input
    if (!todoInput) {
        console.log('Invalid input');
        clearTodoInput(todoInputElement);

        return;
    }

    //get todo date input element
    const todoDateInputElement = document.getElementById('todo-date-input');
    if (!todoDateInputElement) {
        console.log('Element has id named todo-date-input not found');
    }

    //get todo input value
    const todoDateInput = todoDateInputElement.value;
    //check input
    if (!todoDateInput) {
        console.log('Invalid input');
        clearTodoInput(todoInputElement);

        return;
    }

    const todos = getTodoListFromStorage();

    //add array
    todos.push({
        todoInput,
        todoDateInput
    });

    saveTodos(todos);

    updateTodoListElement();
    
    console.log(todos);
    //Don't forget to clear input
    clearTodoInput(todoInputElement);
}

function clearTodoInput(todoInputElement) {
    todoInputElement.value = EMPTY_STRING;
}

function clearTodoListElement(){
    //get todo list element
    const todoListElement = document.getElementById('todo-list');
    if (!todoListElement) {
        console.log('Element has id named todo-list not found');

        return;
    }

    //clear it
    todoListElement.innerHTML = EMPTY_STRING;

    clearTodoArray();
}

function updateTodoListElement(){
    //get todo list element
    const todoListElement = document.getElementById('todo-list');
    if (!todoListElement) {
        console.log('Element has id named todo-list not found');

        return;
    }

    //append todos in todo list
    //FIRST RESET TODO list
    todoListElement.innerHTML = EMPTY_STRING;

    const todos = getTodoListFromStorage();

    for (let i = todos.length - 1; i >= 0; --i) {        
        //Create todo name element
        const todoItemNameElement = document.createElement('div');
        todoItemNameElement.classList.add('todo-list-item');
        todoItemNameElement.innerText = `${todos[i].todoInput}`;

        //Create todo date element
        const todoItemDateElement = document.createElement('div');
        todoItemDateElement.innerText = `${todos[i].todoDateInput}`;
        
        //Create delete button
        const todoItemDeleteButtonElement = document.createElement('button');
        //Set button click attribute
        todoItemDeleteButtonElement.addEventListener('click', () => deleteTodoListItem(i));
        //Set button content
        todoItemDeleteButtonElement.innerText = 'Delete';
        //Set button class
        todoItemDeleteButtonElement.classList.add('btn-delete-todo');


        todoListElement.appendChild(todoItemNameElement);
        todoListElement.appendChild(todoItemDateElement);
        todoListElement.appendChild(todoItemDeleteButtonElement);
    }

    console.log(todos);
}

function clearTodoArray(){
    const todos = getTodoListFromStorage();
    todos.length = 0;

    saveTodos(todos);
}

function deleteTodoListItem(itemId){
    const todos = getTodoListFromStorage();
    console.log(`deleted item id: ${itemId}, name: ${todos[itemId].todoInput}`);
    todos.splice(itemId, 1);
    saveTodos(todos);
    updateTodoListElement();
}