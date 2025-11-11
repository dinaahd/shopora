document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const messageDisplay = document.getElementById('message');
    function displayMessage(msg, type) {
        messageDisplay.textContent = msg;
        messageDisplay.className = type;
    }
    registerBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || password === '') {
            displayMessage('Please enter both username and password.', 'error');
            return;
        }
        const storedUser = localStorage.getItem(username);
        if (storedUser) {
            displayMessage('Username already exists. Please choose another.', 'error');
        } else {
            localStorage.setItem(username, password);
            displayMessage('Registration successful! You can now log in.', 'success');
            usernameInput.value = '';
            passwordInput.value = '';
        }
    });
    loginBtn.addEventListener('click', (event) => {
        event.preventDefault(); 

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || password === '') {
            displayMessage('Please enter both username and password.', 'error');
            return;
        }

        const storedPassword = localStorage.getItem(username);

        if (storedPassword && storedPassword === password) { // Compare 
            displayMessage('Login successful!', 'success');
            usernameInput.value = '';
            passwordInput.value = '';
            window.location.replace('cart.html'); 
        } else {
            displayMessage('Invalid username or password.', 'error');
        }
    });
});