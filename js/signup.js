document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
    const adminSignupCheckbox = document.getElementById('admin_signup');
    const adminPasscodeGroup = document.getElementById('admin_passcode_group');
    const adminPasscode = document.getElementById('admin_passcode');
    const loginLink = document.querySelector('.auth-switch a'); 

    adminSignupCheckbox.addEventListener('change', () => {
        adminPasscodeGroup.style.display = adminSignupCheckbox.checked ? 'block' : 'none';
        if (adminSignupCheckbox.checked) {
            adminPasscode.required = true; 
        } else {
            adminPasscode.required = false;
            adminPasscode.value = ''; 
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const isAdminSignup = adminSignupCheckbox.checked;
        const enteredPasscode = adminPasscode.value;
        const adminRequiredPasscode = "Admin2025#"; 
        
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (isAdminSignup) {
            if (enteredPasscode !== adminRequiredPasscode) {
                alert('Incorrect Admin Passcode!');
                return;
            }
        }
        
        
        const existingUsers = getExistingUsers();
        
       
        if (existingUsers.some(user => user.email === email)) {
            alert('Email already registered! Please use a different email.');
            return;
        }
        
        
        const newUser = { name, email, password, isAdmin: isAdminSignup };
        
        existingUsers.push(newUser);
        
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        localStorage.setItem('isLoggedIn', 'true'); 
        localStorage.setItem('isAdmin', isAdminSignup); 
        sessionStorage.setItem('userEmail', email); 
        sessionStorage.setItem('userName', name);
        
        alert('Account created successfully!');
        document.body.classList.add('slide-out');
        setTimeout(() => {
             window.location.href = 'index.html'; 
        }, 600); 
    });
    
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetUrl = loginLink.href;
            document.body.classList.add('slide-out');
            setTimeout(() => {
                window.location.href = targetUrl; 
            }, 600); 
        });
    }

    function getExistingUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }
});
