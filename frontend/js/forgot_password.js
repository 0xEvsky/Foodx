import { checkEmailExistsAPI } from './API_call.js';

document.addEventListener('DOMContentLoaded', () => {
    const forgotForm = document.getElementById('forgot-password-email-form');
    
    // Exit early if the form doesn't exist on this page
    if (!forgotForm) {
        console.log('Forgot password form not found on this page');
        return;
    }
    
    const emailInput = document.getElementById('recovery-email');
    const securityQuestionsContainer = document.getElementById('security-questions-container');
    const securityAnswerContainer = document.getElementById('security-answer-container');
    const securityQuestionSelect = document.getElementById('security-question');
    const securityAnswerInput = document.getElementById('security-answer');
    const serverError = document.getElementById('forgot-email-server-error');
    const submitButton = forgotForm.querySelector('button[type="submit"]');
    const spinner = submitButton ? submitButton.querySelector('.spinner') : null;
    const buttonText = submitButton ? submitButton.querySelector('.btn-text') : null;
    const recoverViaEmailBtn = document.getElementById('recover-via-email');

    
    if (securityQuestionsContainer) {
        securityQuestionsContainer.style.display = 'none';
    }
    
    if (securityAnswerContainer) {
        securityAnswerContainer.style.display = 'none';
    }

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

        // Show loading state
        submitButton.disabled = true;
        spinner.style.display = 'inline-block';
        buttonText.textContent = 'Checking...';

        try {
            // Check if email exists using the API
            const result = await checkEmailExistsAPI(email);

            console.log("Email check response:", result);
            
            if (result.status === 'success' && result.exists) {
                // Email exists, redirect to reset password page
                window.location.href = `reset_password.html?email=${encodeURIComponent(email)}`;
            } else {
                // Email doesn't exist
                serverError.textContent = 'No account found with that email address.';
            }
        } catch (error) {
            console.error('Error:', error);
            serverError.textContent = 'An error occurred. Please try again later.';
        } finally {
            // Reset button state
            submitButton.disabled = false;
            spinner.style.display = 'none';
            buttonText.textContent = 'Reset Password';
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

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});