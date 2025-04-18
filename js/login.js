document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Get users from localStorage
        const users = localStorage.getItem('users');
        const userArray = users ? JSON.parse(users) : [];
        
        // Find matching user
        const user = userArray.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store login status in sessionStorage
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('userEmail', email);
            if (user.name) {
                sessionStorage.setItem('userName', user.name);
            }
            
            // Redirect to index page
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
});
