document.addEventListener('DOMContentLoaded', () => {
    console.log('Common.js: DOMContentLoaded fired.');
    updateHeaderNav();
    addSmoothScrolling();
});

function updateHeaderNav() {
    console.log('Common.js: updateHeaderNav started.');
    const navUl = document.querySelector('.main-nav .nav-container ul');
    if (!navUl) {
        console.error('Common.js: Navigation list (.main-nav .nav-container ul) not found!');
        return; 
    }

    const loginLi = navUl.querySelector('a[href="login.html"]')?.closest('li');
    const profileLi = navUl.querySelector('a[href="profile.html"]')?.closest('li');
    console.log('Common.js: Found loginLi:', loginLi);
    console.log('Common.js: Found profileLi:', profileLi);

    const existingLogoutLi = navUl.querySelector('#logout-link')?.closest('li');
    if (existingLogoutLi) {
        console.log('Common.js: Removing existing logout link.');
        navUl.removeChild(existingLogoutLi);
    }
    const existingAdminLi = navUl.querySelector('#admin-link')?.closest('li');
    if (existingAdminLi) {
        console.log('Common.js: Removing existing admin link.');
        navUl.removeChild(existingAdminLi);
    }


    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('Common.js: isLoggedIn:', isLoggedIn, 'isAdmin:', isAdmin);

    if (isLoggedIn) {
        console.log('Common.js: User IS logged in.');
        if (loginLi) {
            loginLi.style.display = 'none';
        } else {
            console.warn('Common.js: Login link <li> not found to hide.');
        }

        let referenceNodeForLogout = null;

        if (isAdmin) {
            console.log('Common.js: User is ADMIN. Hiding profile, adding admin link.');
            if (profileLi) {
                profileLi.style.display = 'none';
            } else {
                 console.warn('Common.js: Profile link <li> not found to hide for admin.');
            }

            const adminLi = document.createElement('li');
            adminLi.innerHTML = '<a href="admin.html" id="admin-link" class="nav-link">Admin Panel</a>';
            
            const targetNodeForAdmin = profileLi || loginLi;
            if (targetNodeForAdmin) {
                navUl.insertBefore(adminLi, targetNodeForAdmin);
                referenceNodeForLogout = targetNodeForAdmin;
            } else {
                navUl.appendChild(adminLi);
                referenceNodeForLogout = null;
                 console.warn('Common.js: Neither profile nor login link found, appending admin link.');
            }

        } else {
            console.log('Common.js: User is REGULAR. Showing profile.');
            if (profileLi) {
                profileLi.style.display = '';
                referenceNodeForLogout = profileLi.nextSibling;
            } else {
                console.warn('Common.js: Profile link <li> not found to show for regular user.');
                referenceNodeForLogout = loginLi;
            }
        }

        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = '<a href="#" id="logout-link" class="nav-link">Logout</a>';
        
        if (referenceNodeForLogout) {
             navUl.insertBefore(logoutLi, referenceNodeForLogout);
        } else {
            navUl.appendChild(logoutLi);
        }

        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', handleLogout);
        } else {
            console.error('Common.js: Could not find logout link element after adding it!');
        }

    } else {
        console.log('Common.js: User is NOT logged in. Ensuring login visible, profile hidden.');
        if (loginLi) {
            loginLi.style.display = '';
        } else {
            console.warn('Common.js: Login link <li> not found to ensure visible.');
        }
        if (profileLi) {
             profileLi.style.display = 'none';
        } else {
             console.warn('Common.js: Profile link <li> not found to hide when logged out.');
        }
    }
    console.log('Common.js: updateHeaderNav finished.');
}

function handleLogout(event) {
    console.log('Common.js: handleLogout called.');
    event.preventDefault();
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('favorites');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    
    console.log('Common.js: User logged out, redirecting...');
    
    window.location.href = 'login.html'; 
}

function addSmoothScrolling() {
    console.log('Common.js: Initializing smooth scroll.');
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            
            const targetElement = document.querySelector(hrefAttribute);
            
            if (targetElement) {
                 console.log(`Common.js: Smooth scrolling to ${hrefAttribute}`);
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                 console.log(`Common.js: Target ${hrefAttribute} not found on this page, default behavior.`);
            }
        });
    });
}

if (document.readyState !== 'loading') {
    addSmoothScrolling();
} else {
    document.addEventListener('DOMContentLoaded', addSmoothScrolling);
}

document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    
    var navLinks = document.querySelectorAll('.main-nav ul li a');
    navLinks.forEach(function(link) {
        var linkHref = link.getAttribute('href');
        if (linkHref === page || (page === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});