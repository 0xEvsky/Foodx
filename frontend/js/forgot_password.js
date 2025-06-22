// Forgot password functionality without broken imports
document.addEventListener('DOMContentLoaded', () => {
    const forgotForm = document.getElementById('forgot-password-email-form');
    
    // Exit early if the form doesn't exist on this page
    if (!forgotForm) {
        console.log('Forgot password form not found on this page');
        return;
    }
    
    const emailInput = document.getElementById('recovery-email');
    const emailFormContainer = document.getElementById('email-form-container');
    const securityQuestionsContainer = document.getElementById('security-questions-container');
    const serverError = document.getElementById('forgot-email-server-error');
    const submitButton = forgotForm.querySelector('button[type="submit"]');
    const spinner = submitButton ? submitButton.querySelector('.spinner') : null;
    const buttonText = submitButton ? submitButton.querySelector('.btn-text') : null;
    const recoverViaEmailBtn = document.getElementById('recover-via-email');

    forgotForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        if (!email) {
            emailInput.nextElementSibling.textContent = 'Email is required';
            return;
        }

        if (!isValidEmail(email)) {
            emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
            return;
        }

        // Clear previous errors
        emailInput.nextElementSibling.textContent = '';
        serverError.textContent = '';

        // Show loading state
        submitButton.disabled = true;
        spinner.style.display = 'inline-block';
        buttonText.textContent = 'Checking...';

        try {
            // Check if email exists using the Django API
            const response = await fetch('http://127.0.0.1:8000/users/reset-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            const result = await response.json();
            console.log("Email check response:", result);
            
            if (result.status === 'success' && result.exists) {
                // Email exists, show security questions form
                console.log("Email found, showing security questions");
                showSecurityQuestionsForm(email);
            } else if (result.status === 'success' && !result.exists) {
                // Email doesn't exist
                console.log("Email not found");
                serverError.textContent = 'No account found with that email address.';
            } else {
                // API error
                console.log("API error:", result.message);
                serverError.textContent = result.message || 'An error occurred. Please try again later.';
            }
        } catch (error) {
            console.error('Error:', error);
            serverError.textContent = 'Network error. Please make sure the server is running and try again.';
        } finally {
            // Reset button state
            submitButton.disabled = false;
            spinner.style.display = 'none';
            buttonText.textContent = 'Find Account';
        }
    });

    // Handle "Recover via Email" button click
    if (recoverViaEmailBtn) {
        recoverViaEmailBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (!email || !isValidEmail(email)) {
                emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
                return;
            }

            // Redirect to reset password page directly
            window.location.href = `reset_password.html?email=${encodeURIComponent(email)}`;
        });
    }

    function showSecurityQuestionsForm(email) {
        console.log("Transitioning to security questions form");
        
        // Hide the email form with CSS transition
        emailFormContainer.style.opacity = '0';
        emailFormContainer.style.transform = 'scale(0.95)';
        emailFormContainer.style.pointerEvents = 'none';
        
        // After transition, hide completely and show security questions
        setTimeout(() => {
            emailFormContainer.style.display = 'none';
            
            // Show security questions container
            securityQuestionsContainer.style.display = 'flex';
            securityQuestionsContainer.style.position = 'relative';
            
            // Force a reflow before applying opacity
            securityQuestionsContainer.offsetHeight;
            
            // Apply visible styles
            securityQuestionsContainer.style.opacity = '1';
            securityQuestionsContainer.style.transform = 'scale(1)';
            securityQuestionsContainer.style.pointerEvents = 'auto';
            
            console.log("Security questions form should now be visible");
            
            // Add some sample questions for demonstration
            const questionsList = document.getElementById('questions-list');
            if (questionsList) {
                questionsList.innerHTML = `
                    <div class="form-group">
                        <label for="question1">What was the name of your first pet?</label>
                        <input type="text" id="question1" name="question1" placeholder="Enter your answer" required>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="question2">What city were you born in?</label>
                        <input type="text" id="question2" name="question2" placeholder="Enter your answer" required>
                        <span class="error-message"></span>
                    </div>
                `;
            }
            
            // Instead of auto-redirecting, let user interact with the form
            // You can uncomment the line below to auto-redirect after 3 seconds for testing
            // setTimeout(() => {
            //     window.location.href = `reset_password.html?email=${encodeURIComponent(email)}`;
            // }, 3000);
        }, 500);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});