document.addEventListener('DOMContentLoaded', function() {
    // Set up allergy button event listeners
    const allergyButtons = document.querySelectorAll('.allergy-btn');
    console.log("Found allergy buttons:", allergyButtons.length);
    
    allergyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log("Allergy button clicked:", this.textContent);
            this.classList.toggle('selected');
        });
    });
    
    // Set up modal close functionality
    const modal = document.getElementById('allergyModal');
    if (modal) {
        // Close when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Close when clicking the add button
        const addBtn = modal.querySelector('.add-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    }
    
    // Rest of your DOMContentLoaded code from profile.js
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    
    if (isLoggedIn && isAdmin) {
        console.log('Admin detected, redirecting to admin.html');
        window.location.href = 'admin.html'; 
    } else if (isLoggedIn) {
        console.log('Regular user detected, loading profile page.');
        const userName = sessionStorage.getItem('userName');
        const userEmail = sessionStorage.getItem('userEmail');
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        
        if (nameInput) nameInput.value = userName || '';
        if (emailInput) emailInput.value = userEmail || '';
    } else {
        console.log('User not logged in, redirecting to login.html');
        window.location.href = 'login.html';
    }
});

// Rest of your profile.js code
function allergyPopup() {
    console.log("Allergy Popup Triggered");
    const modal = document.getElementById('allergyModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}