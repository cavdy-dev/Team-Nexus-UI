const email = document.querySelector('#email');
const password = document.querySelector('#password');
const emailError = document.querySelector('.emailError');
const passwordError = document.querySelector('.passwordError');
const submit = document.querySelector('#submit');

const signin = (url, data) => {
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
        emailError.innerHTML = data1.data.email || '';
        passwordError.innerHTML = data1.data.password || '';
      }

      if (data1.status === 404) {
        emailError.innerHTML = data1.data.email || '';
      }

      if (data1.status === 400) {
        passwordError.innerHTML = data1.data.password || '';
      }

      if (data1.status === 200) {
        localStorage.setItem('username', data1.data.username);
        window.location.replace('./LoginSuccess.html');
      }
    }).catch(err => console.log(err));
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  emailError.innerHTML = '';
  passwordError.innerHTML = '';

  const data = {
    email: email.value,
    password: password.value,
  };

  signin('http://teamnexusapi.herokuapp.com/login', data);
});
