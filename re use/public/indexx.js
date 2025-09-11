
// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
});

// Toggle Menu
function toggleMenu() {
    const mainMenu = document.getElementById('mainMenu');
    mainMenu.classList.toggle('active');
}

// Toggle Profile Panel
function toggleProfile() {
    const profilePanel = document.getElementById('profilePanel');
    profilePanel.classList.toggle('active');
}

// Switch Theme
function switchTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('bi-moon');
        themeIcon.classList.add('bi-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('bi-sun');
        themeIcon.classList.add('bi-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('bi-moon');
        themeIcon.classList.add('bi-sun');
    }
}

// Login Modal Functions
function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.classList.add('active');
}

function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.classList.remove('active');
}

function switchLoginTab(tab) {
    const loginTab = document.querySelector('.login-tab.active');
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const tabs = document.querySelectorAll('.login-tab');

    loginTab.classList.remove('active');

    if (tab === 'login') {
        tabs[0].classList.add('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    } else {
        tabs[1].classList.add('active');
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    }
}

// Category redirects
function Categories_redirect() {
    window.location.href = '#Categories';
}

function Technology_redirect() {
    // Redirect to technology quiz page
    window.location.href = 'Science-Quiz.html';
}

function science_redirect() {
    // Redirect to science quiz page
    window.location.href = 'Science-Quiz.html';
}

function Entertainment_redirect() {
    // Redirect to entertainment quiz page
    window.location.href = 'Science-Quiz.html';
}

function logout() {
    // Logout functionality
    console.log('User logged out');
    toggleProfile();
}

// Add scrolled class to navbar on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Check theme on page load
document.addEventListener('DOMContentLoaded', function () {
    checkTheme();
});

function loginredirect() {
    window.location.href = 'signup.html'
}

function retocreate()
{
    window.location.href = 'create-Quiz.html'
}