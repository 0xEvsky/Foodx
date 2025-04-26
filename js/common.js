document.addEventListener('DOMContentLoaded', () => {
    console.log('Common.js: DOMContentLoaded fired.'); // DEBUG
    updateHeaderNav();
    addSmoothScrolling();
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

    // Remove existing logout link and admin link if present to prevent duplicates
    const existingLogoutLi = navUl.querySelector('#logout-link')?.closest('li');
    if (existingLogoutLi) {
        console.log('Common.js: Removing existing logout link.'); // DEBUG
        navUl.removeChild(existingLogoutLi);
    }
    const existingAdminLi = navUl.querySelector('#admin-link')?.closest('li');
    if (existingAdminLi) {
        console.log('Common.js: Removing existing admin link.'); // DEBUG
        navUl.removeChild(existingAdminLi);
    }


    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Read admin status from localStorage
    console.log('Common.js: isLoggedIn:', isLoggedIn, 'isAdmin:', isAdmin); // DEBUG

    if (isLoggedIn) {
        // --- User is Logged In ---
        console.log('Common.js: User IS logged in.'); // DEBUG
        if (loginLi) {
            loginLi.style.display = 'none'; // Hide Login link
        } else {
            console.warn('Common.js: Login link <li> not found to hide.'); // DEBUG
        }

        let referenceNodeForLogout = null; // Node before which logout should be inserted

        if (isAdmin) {
            // --- Admin User ---
            console.log('Common.js: User is ADMIN. Hiding profile, adding admin link.'); // DEBUG
            if (profileLi) {
                profileLi.style.display = 'none'; // Hide Profile icon
            } else {
                 console.warn('Common.js: Profile link <li> not found to hide for admin.'); // DEBUG
            }

            // Create and add Admin Panel link
            const adminLi = document.createElement('li');
            adminLi.innerHTML = '<a href="admin.html" id="admin-link" class="nav-link">Admin Panel</a>'; // Added class for potential styling
            
            // Insert Admin link where profile link was, or before login if profile missing
            const targetNodeForAdmin = profileLi || loginLi; 
            if (targetNodeForAdmin) {
                navUl.insertBefore(adminLi, targetNodeForAdmin);
                referenceNodeForLogout = targetNodeForAdmin; // Logout goes after admin link
            } else {
                navUl.appendChild(adminLi); // Append if neither profile nor login found (fallback)
                referenceNodeForLogout = null; // Logout will be appended
                 console.warn('Common.js: Neither profile nor login link found, appending admin link.'); // DEBUG
            }

        } else {
            // --- Regular User ---
            console.log('Common.js: User is REGULAR. Showing profile.'); // DEBUG
            if (profileLi) {
                profileLi.style.display = ''; // Ensure Profile icon is visible
                referenceNodeForLogout = profileLi.nextSibling; // Logout goes after profile link
            } else {
                console.warn('Common.js: Profile link <li> not found to show for regular user.'); // DEBUG
                referenceNodeForLogout = loginLi; // Fallback: insert logout before login link if profile missing
            }
        }

        // Create and add Logout link (common for both admin and regular logged-in users)
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = '<a href="#" id="logout-link" class="nav-link">Logout</a>'; // Added class
        
        if (referenceNodeForLogout) {
             navUl.insertBefore(logoutLi, referenceNodeForLogout);
        } else {
            navUl.appendChild(logoutLi); // Append if no reference node determined
        }

        // Add logout functionality
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', handleLogout);
        } else {
            console.error('Common.js: Could not find logout link element after adding it!'); // DEBUG
        }

    } else {
        // --- User is Not Logged In ---
        console.log('Common.js: User is NOT logged in. Ensuring login visible, profile hidden.'); // DEBUG
        if (loginLi) {
            loginLi.style.display = ''; // Ensure Login link is visible
        } else {
            console.warn('Common.js: Login link <li> not found to ensure visible.'); // DEBUG
        }
        if (profileLi) {
             profileLi.style.display = 'none'; // Explicitly hide profile icon when logged out
        } else {
             console.warn('Common.js: Profile link <li> not found to hide when logged out.'); // DEBUG
        }
        // Logout and Admin links were already removed or weren't there
    }
    console.log('Common.js: updateHeaderNav finished.'); // DEBUG
}

function handleLogout(event) {
    console.log('Common.js: handleLogout called.'); // DEBUG
    event.preventDefault();
    
    // Clear login status and related info from both localStorage and sessionStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin'); // Remove isAdmin from localStorage
    localStorage.removeItem('favorites'); // Assuming favorites are in localStorage
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    // Clear any other relevant session/local storage items if necessary
    
    console.log('Common.js: User logged out, redirecting...'); // DEBUG
    
    // Redirect to login page
    window.location.href = 'login.html'; 
}

// --- Smooth Scrolling --- 
function addSmoothScrolling() {
    console.log('Common.js: Initializing smooth scroll.'); // DEBUG
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Check if it links to an element on the *current* page
            // Simple check: Does an element with this ID exist?
            const targetElement = document.querySelector(hrefAttribute);
            
            if (targetElement) {
                 console.log(`Common.js: Smooth scrolling to ${hrefAttribute}`); // DEBUG
                e.preventDefault(); // Prevent default jump
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Optional: Update URL hash without jumping
                // history.pushState(null, null, hrefAttribute);
            } else {
                 console.log(`Common.js: Target ${hrefAttribute} not found on this page, default behavior.`); // DEBUG
                 // Allow default behavior if the target isn't on the current page
            }
        });
    });
}

// Ensure smooth scroll initialization also happens if DOMContentLoaded already fired
// (e.g., if script is loaded async without defer)
if (document.readyState !== 'loading') {
    addSmoothScrolling();
} else {
    document.addEventListener('DOMContentLoaded', addSmoothScrolling);
} 