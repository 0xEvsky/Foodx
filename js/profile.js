document.addEventListener('DOMContentLoaded', function() {
    
    // WE ARE NOT USING THIS POP FOR NOW
    // const allergyButtons = document.querySelectorAll('.allergy-btn');
    // console.log("Found allergy buttons:", allergyButtons.length);
    
    // allergyButtons.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         console.log("Allergy button clicked:", this.textContent);
    //         this.classList.toggle('selected');
    //     });
    // });
    
    // // Set up modal close functionality
    // const modal = document.getElementById('allergyModal');
    // if (modal) {
    //     // Close when clicking outside the modal content
    //     window.addEventListener('click', (event) => {
    //         if (event.target === modal) {
    //             modal.style.display = 'none';
    //         }
    //     });
        
    //     // Close when clicking the add button
    //     const addBtn = modal.querySelector('.add-btn');
    //     if (addBtn) {
    //         addBtn.addEventListener('click', () => {
    //             modal.style.display = 'none';
    //         });
    //     }
    // }

    
    // Check localStorage for login status (FIXED)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true'; // Keep admin check in sessionStorage if needed
    
    // Commented out the admin redirection block
    /*
    if (isLoggedIn && isAdmin) {
        console.log('Admin detected, redirecting to admin.html');
        window.location.href = 'admin.html'; 
    } else*/ if (isLoggedIn) {
        console.log('Regular user or admin detected, loading profile page.');
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


// WE DECIDED TO NOT USE THIS POP UP FOR NOW
// function allergyPopup() {
//     console.log("Allergy Popup Triggered");
//     const modal = document.getElementById('allergyModal');
//     if (modal) {
//         modal.style.display = 'flex';
//     }
// }