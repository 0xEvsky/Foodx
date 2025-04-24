document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in and is an admin
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

    if (isLoggedIn && isAdmin) {
        // Redirect admin users to the admin page
        console.log('Admin detected, redirecting to admin.html');
        window.location.href = 'admin.html'; 
    } else if (isLoggedIn) {
        // Proceed with loading profile data for regular logged-in users
        console.log('Regular user detected, loading profile page.');
        // TODO: Add logic here to load user profile data if needed
        const userName = sessionStorage.getItem('userName');
        const userEmail = sessionStorage.getItem('userEmail');

        // Populate profile fields (Example)
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        
        if (nameInput) nameInput.value = userName || '';
        if (emailInput) emailInput.value = userEmail || '';

        // You might want to disable editing or fetch more data

    } else {
        // If not logged in, redirect to login page
        console.log('User not logged in, redirecting to login.html');
        window.location.href = 'login.html';
    }
});
