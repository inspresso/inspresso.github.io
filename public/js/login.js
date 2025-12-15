/* ============================================
   LOGIN PAGE FUNCTIONALITY
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Password visibility toggles
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', function() {
            togglePasswordVisibility('loginPassword', this);
        });
    }

    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    if (toggleSignupPassword) {
        toggleSignupPassword.addEventListener('click', function() {
            togglePasswordVisibility('signupPassword', this);
        });
    }

    const toggleSignupConfirmPassword = document.getElementById('toggleSignupConfirmPassword');
    if (toggleSignupConfirmPassword) {
        toggleSignupConfirmPassword.addEventListener('click', function() {
            togglePasswordVisibility('signupConfirmPassword', this);
        });
    }

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showSuccessMessage('You are already logged in. Redirecting...');
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }
});

// Handle login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Clear previous messages
    clearMessages();

    // Validation
    if (!email || !password) {
        showErrorMessage('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        showErrorMessage('Please enter a valid email address');
        return;
    }

    // Simulate server request (in real app, this would be an API call)
    const loginBtn = document.querySelector('#loginForm .login-btn');
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    loginBtn.textContent = 'Logging in...';

    // Simulated API call with delay
    setTimeout(() => {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('inspresso_users') || '[]');
        
        // Find user with matching email
        const user = users.find(u => u.email === email);

        if (!user) {
            showErrorMessage('Email or password is incorrect');
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            loginBtn.textContent = 'Login to Inspresso';
            return;
        }

        // Check password (in real app, this would be encrypted)
        if (user.password !== password) {
            showErrorMessage('Email or password is incorrect');
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            loginBtn.textContent = 'Login to Inspresso';
            return;
        }

        // Successful login
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            category: user.category
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        if (rememberMe) {
            localStorage.setItem('rememberEmail', email);
        }

        showSuccessMessage('Login successful! Redirecting...');
        
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }, 1500);
}

// Handle signup
function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const category = document.getElementById('signupCategory').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Clear previous messages
    clearMessages();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showErrorMessage('Please fill in all fields');
        return;
    }

    if (name.length < 3) {
        showErrorMessage('Name must be at least 3 characters long');
        return;
    }

    if (!isValidEmail(email)) {
        showErrorMessage('Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showErrorMessage('Password must be at least 6 characters long');
        return;
    }

    if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match');
        return;
    }

    if (!category) {
        showErrorMessage('Please select an interest category');
        return;
    }

    if (!agreeTerms) {
        showErrorMessage('Please agree to the Terms and Privacy Policy');
        return;
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('inspresso_users') || '[]');
    if (users.some(u => u.email === email)) {
        showErrorMessage('Email already registered. Please login instead.');
        return;
    }

    // Simulate server request
    const signupBtn = document.querySelector('#signupForm .login-btn');
    signupBtn.classList.add('loading');
    signupBtn.disabled = true;
    signupBtn.textContent = 'Creating Account...';

    setTimeout(() => {
        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password, // In real app, this would be hashed on server
            category: category,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('inspresso_users', JSON.stringify(users));

        // Auto-login the new user
        const userData = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            category: newUser.category
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));

        showSuccessMessage('Account created successfully! Logging you in...');

        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }, 1500);
}

// Toggle form visibility
function toggleForms(e) {
    e.preventDefault();
    
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('show');

    // Clear messages
    clearMessages();

    // Scroll to top
    document.querySelector('.login-card').scrollIntoView({ behavior: 'smooth' });
}

// Toggle password visibility
function togglePasswordVisibility(inputId, toggleBtn) {
    const input = document.getElementById(inputId);
    const icon = toggleBtn.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Show error message
function showErrorMessage(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.classList.add('show');
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Clear messages
function clearMessages() {
    document.getElementById('errorMessage').classList.remove('show');
    document.getElementById('successMessage').classList.remove('show');
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show forgot password
function showForgotPassword(e) {
    e.preventDefault();
    alert('Password reset functionality would be implemented here.\n\nIn a real app, you would:\n1. Enter your email\n2. Receive a reset link\n3. Create a new password\n\nFor demo purposes, use:\nEmail: demo@inspresso.com\nPassword: demo123');
}

// Social login handlers
function loginWithGoogle() {
    alert('Google login would be implemented here.\n\nFor demo: Uses Google OAuth 2.0');
    // In real app: window.location.href = 'https://accounts.google.com/o/oauth2/auth...';
}

function loginWithGithub() {
    alert('GitHub login would be implemented here.\n\nFor demo: Uses GitHub OAuth');
    // In real app: window.location.href = 'https://github.com/login/oauth/authorize...';
}

function signupWithGoogle() {
    alert('Google signup would be implemented here.\n\nFor demo: Uses Google OAuth 2.0');
}

function signupWithGithub() {
    alert('GitHub signup would be implemented here.\n\nFor demo: Uses GitHub OAuth');
}

// Export functions
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.toggleForms = toggleForms;
window.showForgotPassword = showForgotPassword;
window.loginWithGoogle = loginWithGoogle;
window.loginWithGithub = loginWithGithub;
window.signupWithGoogle = signupWithGoogle;
window.signupWithGithub = signupWithGithub;
