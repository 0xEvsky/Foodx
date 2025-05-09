document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('reset-password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-new-password');
    const serverError = document.getElementById('reset-server-error');
    const emailInput = document.getElementById('reset-email');
    const tokenInput = document.getElementById('reset-token');

    // Get email and token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const token = urlParams.get('token');

    if (!email) {
        serverError.textContent = 'Error: Missing email information. Please start the recovery process again.';
        resetForm.style.display = 'none'; // Hide form if email is missing
        return;
    }

    // Store email and token in hidden fields (optional, but can be useful)
    emailInput.value = email;
    if (token) {
        tokenInput.value = token;
    }

    resetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        serverError.textContent = '';
        // Clear previous field errors
        newPasswordInput.nextElementSibling.textContent = '';
        confirmPasswordInput.nextElementSibling.textContent = '';

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Basic Validation
        if (newPassword.length < 6) {
             newPasswordInput.nextElementSibling.textContent = 'Password must be at least 6 characters.';
             return;
        }
        if (newPassword !== confirmPassword) {
            confirmPasswordInput.nextElementSibling.textContent = 'Passwords do not match.';
            return;
        }

        // --- Verification (Token or Security Question Path) ---
        let canReset = false;

        if (token) {
            // Verify token if it exists
            let recoveryData = JSON.parse(localStorage.getItem('passwordRecovery')) || {};
            const storedData = recoveryData[email];

            if (storedData && storedData.token === token && Date.now() < storedData.expiry) {
                canReset = true;
                // Optional: Remove token after use
                delete recoveryData[email];
                localStorage.setItem('passwordRecovery', JSON.stringify(recoveryData));
            } else {
                serverError.textContent = 'Invalid or expired recovery link. Please try again.';
                return;
            }
        } else {
             // If no token, assume user came from security questions path (already verified)
             // In a real app, you might add another layer of verification here
             canReset = true;
        }

        // --- Update Password in localStorage ---
        if (canReset) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

            if (userIndex !== -1) {
                // Update password (WARNING: Storing plaintext password)
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));

                alert('Password reset successfully! You can now log in with your new password.');
                // Redirect to login page
                window.location.href = 'login.html';
            } else {
                // This shouldn't happen if email validation worked earlier
                serverError.textContent = 'Error finding user account to update.';
            }
        } else {
             // This case should ideally be caught by token check
             serverError.textContent = 'Password reset failed. Please try the recovery process again.';
        }
    });
}); 