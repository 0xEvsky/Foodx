document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration (Replace with secure method in real app!) ---
    const CORRECT_ADMIN_CODE = "Admin2025#"; // IMPORTANT: Demo only, validate server-side!
    // ---------------------------------------------------------------

    const authContainer = document.getElementById('auth-container');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');
    const adminCheckbox = document.getElementById('signup-is-admin-check'); // New Checkbox
    const adminCodeWrapper = document.getElementById('admin-code-wrapper'); // New Wrapper

    // --- Form Switching ---
    showSignupBtn?.addEventListener('click', () => {
        authContainer?.classList.remove('show-login');
        authContainer?.classList.add('show-signup');
        clearAllErrors(); // Clear errors when switching
        adminCheckbox.checked = false; // Uncheck admin on switch
        adminCodeWrapper?.classList.remove('active'); // Hide admin code field
    });

    showLoginBtn?.addEventListener('click', () => {
        authContainer?.classList.remove('show-signup');
        authContainer?.classList.add('show-login');
        clearAllErrors(); // Clear errors when switching
    });

    // --- Toggle Admin Code Field --- 
    adminCheckbox?.addEventListener('change', () => {
        if (adminCheckbox.checked) {
            adminCodeWrapper?.classList.add('active');
        } else {
            adminCodeWrapper?.classList.remove('active');
            // Clear admin code input and error if unchecked
            const adminCodeInput = document.getElementById('signup-admin-code');
            if(adminCodeInput) {
                adminCodeInput.value = '';
                clearError(adminCodeInput);
            }
        }
    });

    // --- Input Validation Styling (Real-time feedback could be added here) ---
    const inputs = document.querySelectorAll('.auth-form-container input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => clearError(input)); // Clear error on typing
    });

    // --- Login Form Submission (AJAX) ---
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const serverErrorDiv = document.getElementById('login-server-error');

        // Basic frontend validation
        if (!validateForm(loginForm)) return;

        setLoading(submitButton, true);
        hideServerError(serverErrorDiv);

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // --- Simulate Server Interaction (Replace with actual fetch) ---
        try {
            // --- Replace this block with actual fetch() call ---
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
            const users = localStorage.getItem('users');
            const userArray = users ? JSON.parse(users) : [];
            const user = userArray.find(u => u.email === email && u.password === password);

            if (user) {
                // Login successful
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', user.isAdmin || 'false'); // Store admin status
                sessionStorage.setItem('userEmail', email);
                if (user.name) {
                    sessionStorage.setItem('userName', user.name);
                }
                
                // Redirect after success (maybe add a success animation/message first)
                window.location.href = 'index.html'; 
                // setLoading(submitButton, false); // Not strictly needed if redirecting

            } else {
                // Login failed
                showServerError(serverErrorDiv, 'Invalid email or password.');
                setLoading(submitButton, false);
            }
            // --- End of fetch() replacement block ---

            /* 
            // Example using actual fetch:
            const response = await fetch('/api/login', { // Your actual API endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful (handle session/token storage)
                localStorage.setItem('isLoggedIn', 'true'); 
                // ... store other user data (token, name, isAdmin)
                window.location.href = 'index.html'; 
            } else {
                // Login failed - show server error message
                showServerError(serverErrorDiv, data.message || 'Login failed. Please try again.');
                setLoading(submitButton, false);
            } 
            */

        } catch (error) {
            console.error("Login Error:", error);
            showServerError(serverErrorDiv, 'An unexpected error occurred. Please try again.');
            setLoading(submitButton, false);
        }
        // --- End of Simulation ---
    });

    // --- Signup Form Submission (AJAX) ---
    signupForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = signupForm.querySelector('button[type="submit"]');
        const serverErrorDiv = document.getElementById('signup-server-error');
        const passwordInput = document.getElementById('signup-password');
        const confirmPasswordInput = document.getElementById('signup-confirm-password');
        const adminCodeInput = document.getElementById('signup-admin-code');
        const isAdminCheckboxChecked = adminCheckbox.checked; // Checkbox state
        let isAdminUser = false; // Assume not admin initially

        // Basic frontend validation (excluding admin code for now)
        let isFormValid = true;
        signupForm.querySelectorAll('input[required]:not(#signup-admin-code)').forEach(input => {
             if (!validateInput(input)) {
                isFormValid = false;
             }
        });
         if (!isFormValid) return;

        // Password match validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match.');
            return;
        } else {
            clearError(confirmPasswordInput); // Clear error if they now match
        }

        // Admin Code Validation (only if checkbox is checked)
        if (isAdminCheckboxChecked) {
            const adminCode = adminCodeInput.value;
            if (!adminCode) {
                showError(adminCodeInput, 'Admin code is required.');
                return; // Stop if admin checkbox checked but code is empty
            } else if (adminCode === CORRECT_ADMIN_CODE) {
                isAdminUser = true; // Set admin status
                clearError(adminCodeInput);
            } else {
                showError(adminCodeInput, 'Invalid Admin Code.');
                return; // Stop if code is incorrect
            }
        } else {
             // Ensure admin status is false if checkbox not checked
             isAdminUser = false; 
             clearError(adminCodeInput); // Clear any previous error just in case
        }

        setLoading(submitButton, true);
        hideServerError(serverErrorDiv);

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = passwordInput.value;

        // --- Simulate Server Interaction (Replace with actual fetch) ---
        try {
             // --- Replace this block with actual fetch() call ---
             await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
             const users = localStorage.getItem('users');
             const userArray = users ? JSON.parse(users) : [];
             
             const existingUser = userArray.find(u => u.email === email);
             if (existingUser) {
                 showServerError(serverErrorDiv, 'An account with this email already exists.');
                 setLoading(submitButton, false);
                 return; // Stop execution
             }

             // Add new user (assuming success)
             const newUser = { name, email, password, isAdmin: isAdminUser }; // Use determined admin status
             userArray.push(newUser);
             localStorage.setItem('users', JSON.stringify(userArray));

             // Optional: Automatically log in the user after signup
             localStorage.setItem('isLoggedIn', 'true');
             localStorage.setItem('isAdmin', isAdminUser.toString()); // Store as string
             sessionStorage.setItem('userEmail', email);
             sessionStorage.setItem('userName', name);

            // Redirect after success
            window.location.href = 'index.html'; 
             // setLoading(submitButton, false); // Not strictly needed if redirecting

            // --- End of fetch() replacement block ---

            /*
             // Example using actual fetch:
            const response = await fetch('/api/signup', { // Your actual API endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Signup successful (handle session/token storage, maybe auto-login)
                localStorage.setItem('isLoggedIn', 'true'); 
                // ... store other user data
                window.location.href = 'index.html'; // Or show a success message and switch to login
            } else {
                // Signup failed - show server error message
                showServerError(serverErrorDiv, data.message || 'Signup failed. Please try again.');
                setLoading(submitButton, false);
            }
            */
            
        } catch (error) {
            console.error("Signup Error:", error);
            showServerError(serverErrorDiv, 'An unexpected error occurred. Please try again.');
            setLoading(submitButton, false);
        }
        // --- End of Simulation ---
    });

    // --- Helper Functions ---

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
        const errorSpan = input.nextElementSibling; // Assuming error span is right after input
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
