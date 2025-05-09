document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('forgot-password-email-form');
    const questionsContainer = document.getElementById('security-questions-container');
    const authContainer = document.getElementById('auth-container');
    const questionsForm = document.getElementById('security-questions-form');
    const serverErrorEmail = document.getElementById('forgot-email-server-error');
    const serverErrorQuestions = document.getElementById('forgot-questions-server-error');
    const recoverViaEmailBtn = document.getElementById('recover-via-email');

    let userEmailForRecovery = null;
    let userSecurityQuestions = null;

    // --- Email Form Submission ---
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        serverErrorEmail.textContent = '';
        const emailInput = document.getElementById('recovery-email');
        const email = emailInput.value.trim();

        if (!email) {
            serverErrorEmail.textContent = 'Please enter your email address.';
            return;
        }

        const users = getUsersFromLocalStorage();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (user && user.security && user.security.length === 3) {
            userEmailForRecovery = user.email;
            userSecurityQuestions = user.security;
            displaySecurityQuestions(user.security);
            // Toggle visibility using CSS classes
            authContainer.classList.remove('show-login');
            authContainer.classList.add('show-signup');
        } else {
            serverErrorEmail.textContent = 'Email not found or security questions not set up for this account.';
        }
    });

    // --- Display Security Questions Dynamically ---
    function displaySecurityQuestions(securityInfo) {
        const questionsList = document.getElementById('questions-list');
        questionsList.innerHTML = '';

        const questionMap = {
            "mother_maiden_name": "What is your mother's maiden name?",
            "first_pet_name": "What was the name of your first pet?",
            "birth_city": "In what city were you born?",
            "childhood_nickname": "What was your childhood nickname?",
            "favorite_teacher": "What is the name of your favorite teacher?"
        };

        securityInfo.forEach((item, index) => {
            const questionText = questionMap[item.question] || item.question;
            const li = document.createElement('div');
            li.classList.add('form-group');
            li.innerHTML = `
                <label for="security_answer_${index}">${questionText}</label>
                <input type="text" id="security_answer_${index}" name="security_answer_${index}" placeholder="Your answer" required>
                <span class="error-message"></span>
            `;
            questionsList.appendChild(li);
        });
    }

    // --- Security Questions Form Submission ---
    if (questionsForm) {
        questionsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            serverErrorQuestions.textContent = '';

            let allCorrect = true;
            const submittedAnswers = [];

            userSecurityQuestions.forEach((item, index) => {
                const answerInput = document.getElementById(`security_answer_${index}`);
                const answer = answerInput ? answerInput.value.trim().toLowerCase() : '';
                submittedAnswers.push(answer);
                if (answer !== item.answer) {
                    allCorrect = false;
                    const errorSpan = answerInput.nextElementSibling;
                    if (errorSpan && errorSpan.classList.contains('error-message')) {
                        errorSpan.textContent = 'Incorrect answer.';
                    }
                } else {
                    const errorSpan = answerInput.nextElementSibling;
                    if (errorSpan && errorSpan.classList.contains('error-message')) {
                        errorSpan.textContent = '';
                    }
                }
            });

            if (allCorrect) {
                alert('Security questions answered correctly! Redirecting to reset password...');
                const emailToPass = userEmailForRecovery;
                userEmailForRecovery = null;
                userSecurityQuestions = null;
                window.location.href = `reset_password.html?email=${encodeURIComponent(emailToPass)}`;
            } else {
                serverErrorQuestions.textContent = 'One or more answers are incorrect. Please try again.';
            }
        });
    }

    // --- Recover Via Email Button ---
    if (recoverViaEmailBtn) {
        recoverViaEmailBtn.addEventListener('click', () => {
            if (!userEmailForRecovery) return;

            const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const expiryTime = Date.now() + 15 * 60 * 1000; // 15 minutes

            let recoveryData = JSON.parse(localStorage.getItem('passwordRecovery')) || {};
            recoveryData[userEmailForRecovery] = { token: resetToken, expiry: expiryTime };
            localStorage.setItem('passwordRecovery', JSON.stringify(recoveryData));

            console.log(`Simulating email recovery for ${userEmailForRecovery}`);
            console.log(`Reset Token (Valid for 15 mins): ${resetToken}`);
            alert(`Simulating email recovery.\n\nNormally, an email would be sent with a reset link.\n\nFor this demo, the token is logged to the console and shown here:\n${resetToken}\n\nYou will be redirected to the reset page.`);

            window.location.href = `reset_password.html?email=${encodeURIComponent(userEmailForRecovery)}&token=${resetToken}`;
            userEmailForRecovery = null;
            userSecurityQuestions = null;
        });
    }

    function getUsersFromLocalStorage() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }
}); 