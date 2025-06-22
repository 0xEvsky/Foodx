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

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const isAdminSignup = adminSignupCheckbox.checked;
        const enteredPasscode = adminPasscode.value;
        const adminRequiredPasscode = "Admin2025#"; 

        // Basic validation
        if (!name) {
            alert('Name is required');
            return;
        }

        if (!email) {
            alert('Email is required');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!password) {
            alert('Password is required');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

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

        // Show loading state
        const submitButton = signupForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Creating Account...';

        try {
            // Make API call to create user
            const response = await fetch('http://127.0.0.1:8000/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    is_admin: isAdminSignup
                })
            });

            const result = await response.json();
            console.log('Signup response:', result);

            if (result.status === 'success') {
                // Account created successfully
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', isAdminSignup.toString());
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('userName', name);
                
                alert('Account created successfully!');
                document.body.classList.add('slide-out');
                setTimeout(() => {
                    window.location.href = 'index.html'; 
                }, 600); 
            } else {
                // Show server error
                alert(result.message || 'An error occurred during signup');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Network error. Please make sure the server is running and try again.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
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

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
