document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        
        const existingUsers = getExistingUsers();
        
       
        if (existingUsers.some(user => user.email === email)) {
            alert('Email already registered! Please use a different email.');
            return;
        }
        
        
        existingUsers.push({ name, email, password });
        
        
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
       
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userName', name);
        
        alert('Account created successfully!');
        window.location.href = 'index.html';
    });
    

    function getExistingUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }
});
