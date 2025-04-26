document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const signupLink = document.querySelector('.auth-switch a');
    
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
            // Store login status in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userEmail', email);
            if (user.name) {
                sessionStorage.setItem('userName', user.name);
            }
            
            // Apply slide-out before redirecting
            document.body.classList.add('slide-out');
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect after animation
            }, 600); // Match animation duration
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });

    // Handle slide-out for signup link
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent immediate navigation
            const targetUrl = signupLink.href;
            document.body.classList.add('slide-out');
            setTimeout(() => {
                window.location.href = targetUrl; // Navigate after animation
            }, 600); // Match animation duration
        });
    }
});
