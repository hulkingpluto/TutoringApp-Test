
class AppHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
          <div class="header">
  
          <img class="logo" src="./Icons/logo.svg" alt="Logo" >
  
          <input class="search" type="text" placeholder="Search" >
  
          <ul ">
              <li ><a href="#"><img src="./Icons/notifications.svg" alt="Notifications" style="color: white; transition: transform 0.3s; font-family: Arial, sans-serif;"></a></li>
              <li ><a href="#"><img src="./Icons/chat.svg" alt="Chat" style="color: white; transition: transform 0.3s; font-family: Arial, sans-serif;"></a></li>
          </ul>
  
          <ul class="account-link">
              <a href="Profile.html" id="profile-link" >
                  <img id="profile-picture" src="./Icons/profile2.jpg" alt="Profile Picture" >
                  <span id="profile-name">Default Name</span>
              </a>
          </ul>
      </div>
          `;
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
            <li><a href="virtualTutoring.html"><img src="./Icons/schedule-svgrepo-com.svg" alt="Schedule"> <span>Virtual Tutoring</span></a></li>
            <li><a href="resource-sharing.html"><img src="./Icons/resources-svgrepo-com.svg" alt="Resources"> <span>Resources</span></a></li>
            <li><a href="#"><img src="./Icons/review-screen-svgrepo-com.svg" alt="Review"> <span>Review</span></a></li>
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
    document.addEventListener('DOMContentLoaded', function() {
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
  
  // Define the new custom element
  customElements.define('app-sidebar', AppSidebar);
  customElements.define("app-header", AppHeader);
  