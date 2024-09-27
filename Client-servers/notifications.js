document.addEventListener("DOMContentLoaded", async () => {
    const userId = getUserId(); // Retrieve the current logged-in user's ID from localStorage
    const notificationsContainer = document.querySelector('.notifications-container');

    // Fetch notifications for the logged-in user
    async function fetchNotifications() {
        try {
            const response = await fetch(`http://localhost:3000/api/notifications?user=${userId}`); // Backend uses this userId to filter
            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            const notifications = await response.json();
            if (notifications.length === 0) {
                notificationsContainer.innerHTML = '<p>No new notifications.</p>';
            } else {
                displayNotifications(notifications);
                console.log(userId);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    // Display notifications dynamically
    function displayNotifications(notifications) {
        notificationsContainer.innerHTML = ''; // Clear existing notifications
        notifications.forEach(notification => {
            const notificationElement = createNotificationElement(notification);
            notificationsContainer.appendChild(notificationElement);
        });
    }

    // Create notification HTML structure
    function createNotificationElement(notification) {
        const notificationDiv = document.createElement('div');
        notificationDiv.classList.add('notification');
        if (notification.read) {
            notificationDiv.classList.add('read');
        }

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('notification-message');
        messageDiv.textContent = notification.message;

        const markReadButton = document.createElement('button');
        markReadButton.classList.add('mark-read-btn');
        markReadButton.textContent = 'Mark as Read';
        markReadButton.setAttribute('data-notification-id', notification._id);
        if (notification.read) {
            markReadButton.disabled = true;
            markReadButton.style.backgroundColor = '#ccc'; // Initial style for already read notifications
        }
        markReadButton.addEventListener('click', () => markAsRead(notification._id));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Remove Notification';
        deleteButton.addEventListener('click', () => deleteNotification(notification._id));

        notificationDiv.appendChild(messageDiv);
        notificationDiv.appendChild(markReadButton);
        notificationDiv.appendChild(deleteButton);

        return notificationDiv;
    }

    // Mark a notification as read
    async function markAsRead(notificationId) {
        try {
            const response = await fetch(`http://localhost:3000/api/notifications/read/${notificationId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to mark notification as read');
            }
            // Find the button by data-notification-id and update its appearance
            const button = document.querySelector(`.mark-read-btn[data-notification-id="${notificationId}"]`);
            if (button) {
                button.disabled = true; // Disable the button
                button.style.backgroundColor = '#ccc'; // Change color to indicate it's read
                button.textContent = 'Read'; // Change button text
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    // Delete a notification
    async function deleteNotification(notificationId) {
        try {
            const response = await fetch(`http://localhost:3000/api/notifications/${notificationId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete notification');
            }
            fetchNotifications(); // Refresh the notifications list
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    }

    // Helper function to get the logged-in user ID
    function getUserId() {
        return localStorage.getItem('userId'); 
    }

    // Fetch notifications on page load
    fetchNotifications();
});
