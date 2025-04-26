document.addEventListener('DOMContentLoaded', () => {
    console.log('Common.js: DOMContentLoaded fired.'); // DEBUG
    updateHeaderNav();
});

function updateHeaderNav() {
    console.log('Common.js: updateHeaderNav started.'); // DEBUG
    const navUl = document.querySelector('.main-nav .nav-container ul');
    if (!navUl) {
        console.error('Common.js: Navigation list (.main-nav .nav-container ul) not found!'); // DEBUG
        return; 
    }

    const loginLi = navUl.querySelector('a[href="login.html"]')?.closest('li');
    const profileLi = navUl.querySelector('a[href="profile.html"]')?.closest('li');
    console.log('Common.js: Found loginLi:', loginLi); // DEBUG
    console.log('Common.js: Found profileLi:', profileLi); // DEBUG

    // Remove existing logout link if present
    const existingLogoutLi = navUl.querySelector('#logout-link')?.closest('li');
    if (existingLogoutLi) {
        console.log('Common.js: Removing existing logout link.'); // DEBUG
        navUl.removeChild(existingLogoutLi);
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log('Common.js: isLoggedIn:', isLoggedIn); // DEBUG

    if (isLoggedIn) {
        // User is logged in
        console.log('Common.js: User IS logged in. Hiding login, adding logout.'); // DEBUG
        if (loginLi) {
            loginLi.style.display = 'none';
        } else {
            console.warn('Common.js: Login link <li> not found to hide.'); // DEBUG
        }

        // Create and add Logout link after Profile
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = '<a href="#" id="logout-link">Logout</a>';
        
        if (profileLi && profileLi.nextSibling) {
             navUl.insertBefore(logoutLi, profileLi.nextSibling);
        } else if (profileLi) {
            navUl.appendChild(logoutLi); // Append if profile is last
        } else {
             console.warn('Common.js: Profile link <li> not found, appending logout to end.'); // DEBUG
            navUl.appendChild(logoutLi); 
        }

        // Add logout functionality
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', handleLogout);
        } else {
            console.error('Common.js: Could not find logout link element after adding it!'); // DEBUG
        }

    } else {
        // User is not logged in
        console.log('Common.js: User is NOT logged in. Ensuring login is visible.'); // DEBUG
        if (loginLi) {
            loginLi.style.display = ''; // Ensure Login link is visible
        } else {
            console.warn('Common.js: Login link <li> not found to ensure visible.'); // DEBUG
        }
        // Logout link is already removed or wasn't there
    }
    console.log('Common.js: updateHeaderNav finished.'); // DEBUG
}

function handleLogout(event) {
    console.log('Common.js: handleLogout called.'); // DEBUG
    event.preventDefault();
    
    // Clear login status and related info
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('favorites');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    
    console.log('Common.js: User logged out, redirecting...'); // DEBUG
    
    // Redirect to login page
    window.location.href = 'login.html'; 
} 