import {refs} from "../refs/refs";
import {signUp} from "../api/api";
import {state} from "../data/data";

export const createSignUpForm = () => {
    const user = {
        email: '',
        password: ''
    }

    const resetUser = () => {
        user.email = '';
        user.password = '';
        refs.signUpForm.reset();
    }

    refs.content.innerHTML = `
    <form class="form" name="signUpForm">
    <fieldset class="form__fieldset">
    <label>Sign Up Form</label>
        <input type="text" name="email" placeholder="E-mail">
        <input type="text" name="password" placeholder="Password">
        <span class="error"></span>
        <button type="submit" class="btn is-centered">Sign Up</button>
        </fieldset>
    </form>
    `

    refs.signUpForm = document.forms.signUpForm;

    const getUserData = (event) => {
        if (state.error) {
            document.querySelector('.error').textContent = '';
            state.error = '';
        }
        const { name, value } = event.target;
        user[name] = value;
    }

    const signUpData = (event) => {
        event.preventDefault();
        signUp(user).then(() => {
            refs.signUpForm.reset();
            resetUser();
        })
    }

    refs.signUpForm.addEventListener('input', getUserData);
    refs.signUpForm.addEventListener('submit', signUpData);
}
