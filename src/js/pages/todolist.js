import {refs} from "../refs/refs";

export const createToDoList = () => {
    refs.toDoListWrapper.innerHTML = `
    <form class="form" name="toDoListForm">
        <label for="new-item">Add new Item</label>
        <input type="text" id="new-item" name="newItem" placeholder="Add new Item">
        <button type="submit" class="btn">Add new Item</button>
    </form>
    `

    let items = [];

    if (localStorage.getItem('items')) {
        items = JSON.parse(localStorage.getItem('items'));
        items.forEach((item) => renderItem(item));
    }

    checkEmptyList()

    refs.toDoListForm = document.forms.toDoListForm;
    const input = refs.toDoListForm.querySelector('#new-item');

    function addItem(event) {
        event.preventDefault();
        const itemText = input.value;

        const newItem = {
            id: Date.now(),
            text: itemText,
            done: false
        }

        items.push(newItem);
        saveToLocalStorage();

        renderItem(newItem);

        input.value = '';
        input.focus();

        checkEmptyList()
    }

    function removeItem(event) {
        if (event.target.dataset.action !== 'delete') return;

        const parentNode = event.target.closest('.to-do-list__tasks-item');
        const id = Number(parentNode.id);
        parentNode.remove();

        const index = items.findIndex((item) => item.id === id);

        saveToLocalStorage()

        items.splice(index, 1);

        checkEmptyList()
    }

    function checkItem(event) {
        if(event.target.dataset.action !== 'done') return
        const parentNode = event.target.closest('.to-do-list__tasks-item');
        const itemTitle = parentNode.querySelector('label[for=input-id]');
        itemTitle.classList.toggle('to-do-list__tasks-item-done');
        const id = Number(parentNode.id);

        const item = items.find((item) => item.id === id)
        item.done = !item.done

        saveToLocalStorage()
    }

    function checkEmptyList() {
        if(items.length === 0) {
            const emptyListElement = `
            <li id="emptyList">
                <img src="./images/empty.svg" alt="you have not to do tasks">
            </li>
        `
            refs.toDoListTasks.insertAdjacentHTML('afterbegin', emptyListElement);
        }

        if (items.length > 0) {
            const emptyListEl = document.querySelector('#emptyList');
            emptyListEl ? emptyListEl.remove() : null;
        }
    }

    function renderItem(item) {
        const itemHTML = `
        <li id="${item.id}" class="to-do-list__tasks-item">
            <div class="to-do-list__wrapper-complete">
            <input id="input-id" type="checkbox">
            <label for="input-id">${item.text}</label>
            </div>
            <input type="text">
            <button className="btn done" data-action="done">Done</button>
            <button className="btn edit" data-action="edit">Edit</button>
            <button className="btn delete" data-action="delete">Delete</button>
       </li>
       `

        refs.toDoListTasks.insertAdjacentHTML('afterbegin', itemHTML);
    }

    const saveToLocalStorage = () => {
        localStorage.setItem('items', JSON.stringify(items))
    }

    refs.toDoListForm.addEventListener('submit', addItem);
    refs.toDoListTasks.addEventListener('click', removeItem);
    refs.toDoListTasks.addEventListener('click', checkItem);
}
