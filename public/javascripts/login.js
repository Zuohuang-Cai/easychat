const signElement = document.getElementById('SIGN');
const loginElement = document.getElementById('login');
const inputFormElement = document.getElementById('inputform');

signElement.addEventListener('mouseover', function () {
    inputFormElement.style.background = '#0d6efd';
});

signElement.addEventListener('mouseout', function () {
    inputFormElement.style.background = '';
});

loginElement.addEventListener('mouseover', function () {
    inputFormElement.style.background = '#dc3545';
});

loginElement.addEventListener('mouseout', function () {
    inputFormElement.style.background = '';
});

function setbuttonvalue(id) {
    document.getElementById("SENDFORM").setAttribute("action", "/" + id);
}