import {refs} from "../refs/refs";

export const createToDoList = () => {
    refs.toDoListWrapper.innerHTML = `
        <header class="heading">
            <div class="heading__wrapper">
                <h1 class="heading__title">To do list</h1>
            </div>
        </header>
    <form class="form" name="toDoListForm">
        <fieldset class="form__fieldset">
            <label for="new-item" class="form__label">Add new Item</label>
            <input type="text" class="form__field" id="new-item" name="newItem" placeholder="Add new Item">
            <button type="submit" class="btn">Add new Item</button>
        </fieldset>
    </form>
    `

    let items = [];

    if (localStorage.getItem('items')) {
        items = JSON.parse(localStorage.getItem('items'));
        refs.toDoListTasks.innerHTML = ''
        items.forEach((item) => renderItem(item));
    }

    checkEmptyList()

    refs.toDoListForm = document.forms.toDoListForm;
    const input = refs.toDoListForm.querySelector('#new-item');

    function addItem(event) {
        event.preventDefault();
        const itemText = input.value;

        if(itemText === '') return;

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

        const parentNode = event.target.closest('.to-do-list__item');
        const id = Number(parentNode.id);
        parentNode.remove();

        const index = items.findIndex((item) => item.id === id);

        items.splice(index, 1);

        saveToLocalStorage()

        checkEmptyList()
    }

    function checkItem(event) {
        if(event.target.dataset.action !== 'done') return
        const parentNode = event.target.closest('.to-do-list__item');
        const itemTitle = parentNode.querySelector('.to-do-list__text');

        itemTitle.classList.toggle('is-completed');
        const id = Number(parentNode.id);

        const item = items.find((item) => item.id === id)
        item.done = !item.done

        saveToLocalStorage()
    }

    function checkEmptyList() {
        if(items.length === 0) {
            const emptyListElement = `
            <li class="to-do-list__one-item" id="emptyList">
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
        <li id="${item.id}" class="to-do-list__item">
            <article class="to-do-list__article">
            <span class="to-do-list__text">${item.text}</span>
            <input type="text" name="editItem" class="edit-item is-hidden">
            <div class="to-do-list__btn-wrapper">
            <button type="button" class="btn is-small is-done" data-action="done">
           <span aria-hidden="true" class="fa-solid fa-check-double"></span>
            <span class="btn__text">Done</span>
            </button>
            <button type="button" class="btn is-small is-edit" data-action="edit">
            <span aria-hidden="true" class="fa-solid fa-pen-to-square"></span>
            <span class="btn__text">Edit</span></button>
            <button type="button" class="btn is-small is-delete" data-action="delete">
            <span aria-hidden="true" class="fa-solid fa-trash"></span>
            <span class="btn__text">Delete</span></button>
            </div>
</article>
       </li>
       `

        refs.toDoListTasks.insertAdjacentHTML('afterbegin', itemHTML);
    }

    const saveToLocalStorage = () => {
        localStorage.setItem('items', JSON.stringify(items))
    }

    function editItem(event) {
        if(event.target.dataset.action !== 'edit') return;

        const parentNode = event.target.closest('.to-do-list__item');
        const inputEdit = parentNode.querySelector('.edit-item');
        const id = Number(parentNode.id);

        const item = items.find((item) => item.id === id);

        if (item && !inputEdit.value) {
            inputEdit.classList.remove('is-hidden');
            inputEdit.value = item.text;
            return;
        }

        if (inputEdit.value) {
            inputEdit.classList.add('is-hidden');
            item.text = inputEdit.value;
            items = items.map(data => data.id === id ? item : data);
            saveToLocalStorage();
            inputEdit.value = '';
            refs.toDoListTasks.innerHTML = '';
            items.forEach((item) => renderItem(item));
        }

    }

    refs.toDoListForm.addEventListener('submit', addItem);
    refs.toDoListTasks.addEventListener('click', removeItem);
    refs.toDoListTasks.addEventListener('click', checkItem);
    refs.toDoListTasks.addEventListener('click', editItem);
}
