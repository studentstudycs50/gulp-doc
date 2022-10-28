import {refs} from "../refs/refs";
import {state} from "../data/data";
import {signIn} from "../api/api";

export const createSignInForm = () => {
    const user = {
        email: '',
        password: ''
    }

    const resetUser = () => {
        user.email = '';
        user.password = '';
        refs.signInForm.reset();
    }

    refs.content.innerHTML = `
    <form name="signInForm">
    <legend>Sign in Form</legend>
        <input type="text" name="email" placeholder="E-mail">
        <input type="text" name="password" placeholder="Password">
        <span class="errorSignIn"></span>
        <button type="submit" class="btn is-centered">Sign In</button>
    </form>`

    refs.signInForm = document.forms.signInForm;

    const getUserData = (event) => {
        if (state.error) {
            document.querySelector('.error').textContent = '';
            refs.errorSignIn.textContent = '';
            state.error = '';
        }
        const { name, value } = event.target;
        user[name] = value;
    }

    const signInData = (event) => {
        event.preventDefault();
        if (state.error) {
            return
        }
            signIn(user).then(resetUser).then(() => {
            refs.navigation.querySelector('[data-page="signUp"]').classList.add('is-hidden');
            refs.navigation.querySelector('[data-page="signIn"]').classList.add('is-hidden');
            refs.navigation.querySelector('[data-page="logOut"]').classList.remove('is-hidden');
            refs.navigation.querySelector('[data-page="toDoList"]').classList.remove('is-hidden');
        })
    }

    refs.signInForm.addEventListener('input', getUserData);
    refs.signInForm.addEventListener('submit', signInData);
}
