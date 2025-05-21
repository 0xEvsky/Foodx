document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('reset-password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-new-password');
    const serverError = document.getElementById('reset-server-error');
    const emailInput = document.getElementById('reset-email');
    const tokenInput = document.getElementById('reset-token');


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

    resetForm.addEventListener('submit', (e) => {
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

    
        let canReset = false;

        if (token) {

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
             canReset = true;
        }


        if (canReset) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

            if (userIndex !== -1) {

                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));

                alert('Password reset successfully! You can now log in with your new password.');
  
                window.location.href = 'login.html';
            } else {

                serverError.textContent = 'Error finding user account to update.';
            }
        } else {

             serverError.textContent = 'Password reset failed. Please try the recovery process again.';
        }
    });
}); 