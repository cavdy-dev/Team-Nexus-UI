const welcome = document.querySelector('.welcome');
const logout = document.querySelector('.logout');

welcome.innerHTML = `Welcome ${localStorage.username.toUpperCase()}`;

logout.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.replace('./index.html');
});
