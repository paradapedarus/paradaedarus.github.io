// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}


// Пример использования:
if (getCookie('login') == ''){
  setCookie('login', '', {secure: true, 'max-age': 3600});
  setCookie('password', '', {secure: true, 'max-age': 3600});
}
if (getCookie('logged') == false){
  setCookie('logged', false, {secure: true, 'max-age': 3600});
}




// Вывод кнопки в зависимости от авторизации
if (getCookie('logged') != 'true'){
  let li = document.createElement('li');
  let a = document.createElement('a');
  a.href = '#';
  a.className = 'root-item login';
  li.append(a);
  a.innerHTML = 'Личный кабинет';
  a.setAttribute('data-modal-link', 'sign-in');
  document.querySelector('.main-menu ul').append(li);
} else {
  let li = document.createElement('li');
  let a = document.createElement('a');
  a.href = '#';
  a.className = 'root-item logout';
  li.append(a);
  a.innerHTML = 'Выйти';
  a.setAttribute('data-logout', '');
  document.querySelector('.main-menu ul').append(li);
}





let modalSignUp = document.querySelector('#sign-up');
let modalSignIn = document.querySelector('#sign-in');

let modalSignUpBtn = modalSignUp.querySelector('.modal__btn');
let modalSignInBtn = modalSignIn.querySelector('.modal__btn');

// регистрация по клику
modalSignUpBtn.addEventListener('click', signUpUser);
// вход по клику
modalSignInBtn.addEventListener('click', signInUser);



// функция регистрации
function signUpUser (){
  let userLogin = modalSignUp.querySelector('#sign-up-login').value;
  let userPassword1 = modalSignUp.querySelector('#sign-up-password-1').value;
  let userPassword2 = modalSignUp.querySelector('#sign-up-password-2').value;

  if (userPassword1 != userPassword2) {
    alert("Пароли не совпадают");
    return;
  }
  if (userLogin == '' || userPassword1 == ''){
    alert("Вы не ввели логин или пароль");
    return;
  }

  setCookie('login', userLogin, {secure: true, 'max-age': 3600}); // время хранения данных
  setCookie('password', userPassword1, {secure: true, 'max-age': 3600});
  alert("Вы успешно зарегистрировались");
}
// функция входа
function signInUser (){
  let userLogin = modalSignIn.querySelector('#sign-in-login').value;
  let userPassword = modalSignIn.querySelector('#sign-in-password').value;

  if (userLogin != getCookie('login')){
    alert("Вы ввели не правильный логин");
    return;
  }
  if (userPassword != getCookie('password')){
    alert("Вы ввели не правильный пароль");
    return;
  }

  setCookie('logged', true, {secure: true, 'max-age': 3600});
  alert("Вы успешно вошли в личный кабинет");
  location.reload();
}




// console.log(getCookie('login'));
// console.log(getCookie('password'));
// console.log(getCookie('logged'));










