document.addEventListener('DOMContentLoaded', function() {

    
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true'; 
    

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
