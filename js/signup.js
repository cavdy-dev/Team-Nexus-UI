const name = document.querySelector('#name');
const email = document.querySelector('#email');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const cpassword = document.querySelector('#cpassword');
const nameError = document.querySelector('.nameError');
const emailError = document.querySelector('.emailError');
const usernameError = document.querySelector('.usernameError');
const passwordError = document.querySelector('.passwordError');
const cPasswordError = document.querySelector('.cPasswordError');
const success = document.querySelector('.success');
const submit = document.querySelector('#submit');


const singup = (url, data) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data1) => {
      if (data1.status === 422) {
        nameError.innerHTML = data1.data.name || '';
        emailError.innerHTML = data1.data.email || '';
        usernameError.innerHTML = data1.data.username || '';
        passwordError.innerHTML = data1.data.password || '';
      }

      if (data1.status === 409) {
        emailError.innerHTML = data1.data.email || '';
        usernameError.innerHTML = data1.data.username || '';
      }

      if (data1.status === 200) {
        success.innerHTML = `${data1.data}. You can login`;
      }
    }).catch(err => console.log(err))
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  nameError.innerHTML = '';
  emailError.innerHTML = '';
  usernameError.innerHTML = '';
  passwordError.innerHTML = '';
  success.innerHTML = '';

  const data = {
    name: name.value,
    email: email.value,
    username: username.value,
    password: password.value,
  };

  if (password.value === cpassword.value) {
    singup('https://teamnexusapi.herokuapp.com/register', data);
  } else {
    cPasswordError.innerHTML = 'Password do not match';
  }
});