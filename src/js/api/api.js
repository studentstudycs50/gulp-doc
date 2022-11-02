import axios from "axios";
import { state } from "../data/data";
import { refs } from "../refs/refs";
// функция отправляет данные на БЕ и выводит данные полученные с Бе

// куда обратиться чтобы получить или записать какие-то данные
const API_KEY = 'AIzaSyBN8QfoIyaOOcYoZtMLZD94kB6MEjAsunU';
const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const baseURL = 'https://to-do-list-second-attempt-default-rtdb.firebaseio.com';
//регистрация нового пользователя, делаем запрос на БЕ
const signUp = async user => {
   refs.loader.classList.toggle('is-active');
   try {
      const response = await axios.post(signUpURL, { ...user, returnSecureToken: true, });
      const data = { email: response.data.email, localId: response.data.localId };
      const token = response.data.idToken;
      addToDB(data, token);
   } catch (error) {
   state.error = error.response.data.error.message;
   document.querySelector('.error').textContent = error.response.data.error.message;
   } finally {
      refs.loader.classList.toggle('is-active');
   }
}

const signIn = async user => {
   refs.loader.classList.toggle('is-active');
   try {
      const response = await axios.post(signInURL, { ...user, returnSecureToken: true });
      localStorage.setItem('idToken', JSON.stringify(response.data.idToken));
      getFromDB();
   } catch (error) {
      document.querySelector('.errorSignIn').textContent = error.response.data.error.message;
      state.error = error.response.data.error.message;
      // throw new Error(state.error);
   } finally {
      refs.loader.classList.toggle('is-active');
   }
}

const logOut = () => {
   localStorage.clear()
}

// записывает в БД
const addToDB = (data, token) => {
   return axios.post(`${baseURL}/users.json?auth=${token}`, data);
}

const getFromDB = () => {
   if (localStorage.getItem('idToken')) {
      const token = JSON.parse(localStorage.getItem("idToken")); //преобразовуем в стрoку
      return axios.get(`${baseURL}/users.json?auth=${token}`);
   } else console.log('no id Token!!!!');
}

export { signUp, signIn, logOut };
