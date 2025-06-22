document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('reset-password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-new-password');
    const serverError = document.getElementById('reset-server-error');
    const emailInput = document.getElementById('reset-email');
    const tokenInput = document.getElementById('reset-token');
    const submitButton = resetForm.querySelector('button[type="submit"]');
    const spinner = submitButton.querySelector('.spinner');
    const buttonText = submitButton.querySelector('.btn-text');

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const token = urlParams.get('token');

    if (!email) {
        serverError.textContent = 'Error: Missing email information. Please start the recovery process again.';
        resetForm.style.display = 'none'; 
        return;
    }

    emailInput.value = email;
    if (token) {
        tokenInput.value = token;
    }

    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        serverError.textContent = '';

        newPasswordInput.nextElementSibling.textContent = '';
        confirmPasswordInput.nextElementSibling.textContent = '';

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newPassword.length < 6) {
            newPasswordInput.nextElementSibling.textContent = 'Password must be at least 6 characters.';
            return;
        }
        if (newPassword !== confirmPassword) {
            confirmPasswordInput.nextElementSibling.textContent = 'Passwords do not match.';
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        if (spinner) spinner.style.display = 'inline-block';
        if (buttonText) buttonText.textContent = 'Updating...';

        try {

            const response = await fetch('http://127.0.0.1:8000/users/update-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email,
                    password: newPassword
                })
            });

            const result = await response.json();
            console.log("Password update response:", result);
            
            if (result.status === 'success') {
                alert('Password reset successfully! You can now log in with your new password.');
                window.location.href = '/user-login/';
            } else {
                serverError.textContent = result.message || 'Error updating password. Please try again.';
            }
        } catch (error) {
            console.error('Error:', error);
            serverError.textContent = 'Network error. Please make sure the server is running and try again.';
        } finally {
            // Reset button state
            submitButton.disabled = false;
            if (spinner) spinner.style.display = 'none';
            if (buttonText) buttonText.textContent = 'Update Password';
        }
    });
});