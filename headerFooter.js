class AppHeader extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
        <div class="header">
            <img class="logo" src="./Icons/logo.svg" alt="Logo">
            <input class="search" type="text" placeholder="Search">
            <ul>
                <li>
                    <a href="notifications.html">
                        <div class="notification-bell">
                            <img src="./Icons/notifications.svg" alt="Notifications" style="color: white; transition: transform 0.3s;">
                            <span class="notification-dot" style="display: none;"></span> <!-- Red dot -->
                        </div>
                    </a>
                </li>
                <li><a href="#"><img src="./Icons/chat.svg" alt="Chat" style="color: white; transition: transform 0.3s;"></a></li>
            </ul>
            <ul class="account-link">
                <a href="Profile.html" id="profile-link">
                    <img id="profile-picture" src="./Icons/profile2.jpg" alt="Profile Picture">
                    <span id="profile-name">Default Name</span>
                </a>
            </ul>
        </div>
    `;

    // Call the method to update the notification dot
    this.updateNotificationDot();
  }

  // Method to check for unread notifications and show/hide the dot
  updateNotificationDot() {
    const hasUnreadNotifications = localStorage.getItem('hasUnreadNotifications');
    const notificationDot = this.querySelector('.notification-dot');

    if (hasUnreadNotifications === 'true') {
      notificationDot.style.display = 'block'; // Show the red dot
    } else {
      notificationDot.style.display = 'none'; // Hide the red dot
    }
  }
}

class AppSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="sidebar" class="sidebar">
        <button id="toggleButton" class="toggle-button">
          <img src="./Icons/arrow-left-svgrepo-com.svg" alt="Toggle">
        </button>
        <ul>
          <li><a href="dashboard.html"><img src="./Icons/dashboard-svgrepo-com.svg" alt="Dashboard"> <span>Dashboard</span></a></li>
          <li><a href="AvailableTutors.html"><img src="./Icons/people-svgrepo-com.svg" alt="Tutors"> <span>Tutors</span></a></li>
          <li><a href="bookings.html"><img src="./Icons/schedule-svgrepo-com.svg" alt="Schedule"> <span>Schedule</span></a></li>
          <li><a href="virtualTutoring.html"><img src="./Icons/schedule-svgrepo-com.svg" alt="Virtual Tutoring"> <span>Virtual Tutoring</span></a></li>
          <li><a href="resource-sharing.html"><img src="./Icons/resources-svgrepo-com.svg" alt="Resources"> <span>Resources</span></a></li>
          <li><a href="#"><img src="./Icons/review-screen-svgrepo-com.svg" alt="Review"> <span>Transport</span></a></li>
          <li><a href="#" id="logout"><img src="./Icons/logout-icon.svg" alt="Logout"> <span>Logout</span></a></li>
        </ul>
      </div>
    `;

    // Handle logout
    this.querySelector('#logout').addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = './login.html';
    });

    // Ensure user is authenticated
    document.addEventListener('DOMContentLoaded', () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = './login.html';
      } else {
        document.body.style.display = 'block';
      }
    });

    // Handle sidebar toggle
    const sidebar = this.querySelector('#sidebar');
    const toggleButton = this.querySelector('#toggleButton');
    toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }
}

// Define the new custom elements
customElements.define('app-sidebar', AppSidebar);
customElements.define('app-header', AppHeader);
