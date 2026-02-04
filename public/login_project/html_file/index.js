const signupBtn = document.getElementById('submitsignup');
const loginForm = document.getElementById('loginform');
const signupForm = document.getElementById('signupform');

signupBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Stop the form from submitting
    loginForm.classList.add('hidden');   // Hide Login
    signupForm.classList.remove('hidden'); // Show Sign Up
});