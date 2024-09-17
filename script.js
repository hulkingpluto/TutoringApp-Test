// Sidebar toggle button
document.getElementById("toggleButton").addEventListener("click", function() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");

    // Adjust resource-sharing-section width when sidebar is toggled
    adjustResourceSectionWidth();
});

// Chat toggle button
document.getElementById("toggleButton-chat").addEventListener("click", function() {
    var chat = document.getElementsByClassName("chat-section")[0];
    chat.classList.toggle("collapsed");
});

// Function to adjust the width of resource-sharing-section based on sidebar toggle only
function adjustResourceSectionWidth() {
    const sidebar = document.getElementById("sidebar");
    const resourceSection = document.querySelector('.resource-sharing-section');
    
    if (sidebar.classList.contains("collapsed")) {
        resourceSection.style.width = 'calc(100% - 60px)';
    } else {
        resourceSection.style.width = 'calc(100% - 250px)';
    }
}

// Get the dark mode toggle switch
const darkModeSwitch = document.getElementById('dark-mode-switch');

function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    window.location.href = './login.html';
}

function handleLogoutt() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    window.location.href = '../login.html';
}
// Function to toggle dark mode
function toggleDarkMode() {
    const elementsToToggle = [
        document.body,
        document.querySelector('.header'),
        document.querySelector('.sidebar'),
        document.querySelector('.main-content'),
        document.querySelector('.search'),
        document.querySelector('.video-link-section'),
        document.querySelector('.chat-section'),
        document.querySelector('.chat-header'),
        document.querySelector('.chat-window'),
        document.querySelector('.chat-input')
    ];

    elementsToToggle.forEach(element => {
        element?.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.section, .message').forEach(element => {
        element.classList.toggle('dark-mode');
    });
}

// Event listener for the dark mode switch
darkModeSwitch.addEventListener('change', toggleDarkMode);

// Adjust the resource section width on page load to account for the initial collapsed state
window.onload = adjustResourceSectionWidth;
