import { refs } from "./refs/refs";
import { signUp, signIn, logOut } from "./api/api";
import {createSignUpForm} from "./forms/signUpForm";
import {createSignInForm} from "./forms/signInForm";
import {createToDoList} from "./pages/todolist";

const getPage = event => {
    if (event.target === event.currentTarget) {
        return
    }

    switch (event.target.dataset.page) {
        case 'signUp':
            createSignUpForm();
            break;

        case 'signIn':
            createSignInForm();
            break;

        case 'logOut':
            createToDoList();
            break;

        case 'home':
            createToDoList();
            break;

        default:
            createToDoList();
            break;
    }

}

const logOutHandler = () => {
    logOut()
    refs.navigation.querySelector('[data-page="signUp"]').classList.toggle('is-hidden');
    refs.navigation.querySelector('[data-page="signIn"]').classList.toggle('is-hidden');
    refs.navigation.querySelector('[data-page="logOut"]').classList.toggle('is-hidden');
}

refs.navigation.addEventListener('click', getPage);
refs.navigation.querySelector('[data-page="logOut"]').addEventListener('click', logOutHandler);


