const hamburgerElement = document.querySelector('#myButton');
// const navElement = document.querySelector('.menuLinks'); // TODO
const navElement = document.querySelector('#animateme'); // TODO

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});