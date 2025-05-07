document.addEventListener('DOMContentLoaded', () => {
    const CORRECT_ADMIN_CODE = "Admin2025#"; 

    const authContainer = document.getElementById('auth-container');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');
    const adminCheckbox = document.getElementById('signup-is-admin-check'); 
    const adminCodeWrapper = document.getElementById('admin-code-wrapper'); 

    showSignupBtn?.addEventListener('click', () => {
        authContainer?.classList.remove('show-login');
        authContainer?.classList.add('show-signup');
        clearAllErrors(); 
        adminCheckbox.checked = false; 
        adminCodeWrapper?.classList.remove('active'); 
    });

    showLoginBtn?.addEventListener('click', () => {
        authContainer?.classList.remove('show-signup');
        authContainer?.classList.add('show-login');
        clearAllErrors(); 
    });

    adminCheckbox?.addEventListener('change', () => {
        if (adminCheckbox.checked) {
            adminCodeWrapper?.classList.add('active');
        } else {
            adminCodeWrapper?.classList.remove('active');
            const adminCodeInput = document.getElementById('signup-admin-code');
            if(adminCodeInput) {
                adminCodeInput.value = '';
                clearError(adminCodeInput);
            }
        }
    });

    const inputs = document.querySelectorAll('.auth-form-container input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => clearError(input)); 
    });

    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const serverErrorDiv = document.getElementById('login-server-error');

        if (!validateForm(loginForm)) return;

        setLoading(submitButton, true);
        hideServerError(serverErrorDiv);

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            const users = localStorage.getItem('users');
            const userArray = users ? JSON.parse(users) : [];
            const user = userArray.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', user.isAdmin || 'false'); 
                sessionStorage.setItem('userEmail', email);
                if (user.name) {
                    sessionStorage.setItem('userName', user.name);
                }
                
                window.location.href = 'index.html'; 

            } else {
                showServerError(serverErrorDiv, 'Invalid email or password.');
                setLoading(submitButton, false);
            }


        } catch (error) {
            console.error("Login Error:", error);
            showServerError(serverErrorDiv, 'An unexpected error occurred. Please try again.');
            setLoading(submitButton, false);
        }
    });

    signupForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = signupForm.querySelector('button[type="submit"]');
        const serverErrorDiv = document.getElementById('signup-server-error');
        const passwordInput = document.getElementById('signup-password');
        const confirmPasswordInput = document.getElementById('signup-confirm-password');
        const adminCodeInput = document.getElementById('signup-admin-code');
        const isAdminCheckboxChecked = adminCheckbox.checked; 
        let isAdminUser = false; 

        let isFormValid = true;
        signupForm.querySelectorAll('input[required]:not(#signup-admin-code)').forEach(input => {
             if (!validateInput(input)) {
                isFormValid = false;
             }
        });
         if (!isFormValid) return;

        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match.');
            return;
        } else {
            clearError(confirmPasswordInput); 
        }

        if (isAdminCheckboxChecked) {
            const adminCode = adminCodeInput.value;
            if (!adminCode) {
                showError(adminCodeInput, 'Admin code is required.');
                return; 
            } else if (adminCode === CORRECT_ADMIN_CODE) {
                isAdminUser = true; 
                clearError(adminCodeInput);
            } else {
                showError(adminCodeInput, 'Invalid Admin Code.');
                return; 
            }
        } else {
             isAdminUser = false; 
             clearError(adminCodeInput); 
        }

        setLoading(submitButton, true);
        hideServerError(serverErrorDiv);

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = passwordInput.value;

        try {
             await new Promise(resolve => setTimeout(resolve, 1500)); 
             const users = localStorage.getItem('users');
             const userArray = users ? JSON.parse(users) : [];
             
             const existingUser = userArray.find(u => u.email === email);
             if (existingUser) {
                 showServerError(serverErrorDiv, 'An account with this email already exists.');
                 setLoading(submitButton, false);
                 return; 
             }

             const newUser = { name, email, password, isAdmin: isAdminUser }; 
             userArray.push(newUser);
             localStorage.setItem('users', JSON.stringify(userArray));

             localStorage.setItem('isLoggedIn', 'true');
             localStorage.setItem('isAdmin', isAdminUser.toString()); 
             sessionStorage.setItem('userEmail', email);
             sessionStorage.setItem('userName', name);

            window.location.href = 'index.html'; 

            /*
            
            const response = await fetch('/api/signup', { // Your actual API endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                
                localStorage.setItem('isLoggedIn', 'true'); 
                
                window.location.href = 'index.html'; // Or show a success message and switch to login
            } else {
                
                showServerError(serverErrorDiv, data.message || 'Signup failed. Please try again.');
                setLoading(submitButton, false);
            }
            */
            
        } catch (error) {
            console.error("Signup Error:", error);
            showServerError(serverErrorDiv, 'An unexpected error occurred. Please try again.');
            setLoading(submitButton, false);
        }
    });

    function setLoading(button, isLoading) {
        if (!button) return;
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    function validateInput(input) {
        const errorSpan = input.nextElementSibling; 
        if (!input.checkValidity()) {
            input.classList.add('input-error');
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = input.validationMessage;
                errorSpan.classList.add('show');
            }
            return false;
        } else {
            clearError(input);
            return true;
        }
    }

    function validateForm(form) {
        let isValid = true;
        const requiredInputs = form.querySelectorAll('input[required]');
        requiredInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    function showError(input, message) {
        const errorSpan = input.nextElementSibling;
        input.classList.add('input-error');
         if (errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.textContent = message;
            errorSpan.classList.add('show');
        }
    }

    function clearError(input) {
        const errorSpan = input.nextElementSibling;
        input.classList.remove('input-error');
         if (errorSpan && errorSpan.classList.contains('error-message')) {
             errorSpan.textContent = '';
             errorSpan.classList.remove('show');
         }
    }
     function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(span => {
            span.textContent = '';
            span.classList.remove('show');
        });
        document.querySelectorAll('.input-error').forEach(input => {
            input.classList.remove('input-error');
        });
        hideServerError(document.getElementById('login-server-error'));
        hideServerError(document.getElementById('signup-server-error'));
    }


    function showServerError(div, message) {
        if (!div) return;
        div.textContent = message;
        div.classList.add('show');
    }

    function hideServerError(div) {
        if (!div) return;
        div.textContent = '';
        div.classList.remove('show');
    }

}); // End DOMContentLoaded
