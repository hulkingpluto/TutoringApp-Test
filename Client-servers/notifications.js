document.addEventListener("DOMContentLoaded", async () => {
    const userId = getUserId(); // Assume a function that gets the current logged-in user's ID
    const notificationsContainer = document.querySelector('.notifications-container');

    // Fetch notifications for the logged-in user
    async function fetchNotifications() {
        try {
            const response = await fetch(`http://localhost:3000/api/notifications?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            const notifications = await response.json();
            displayNotifications(notifications);
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
        if (notification.read) {
            markReadButton.disabled = true;
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
            const response = await fetch(`/api/notifications/read/${notificationId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to mark notification as read');
            }
            fetchNotifications(); // Refresh the notifications list
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    // Delete a notification
    async function deleteNotification(notificationId) {
        try {
            const response = await fetch(`/api/notifications/${notificationId}`, {
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

    // Helper function to get the logged-in user ID (can be adapted as per your auth logic)
    function getUserId() {
        // Example: fetching from localStorage
        return localStorage.getItem('userId'); // Make sure userId is stored in localStorage on login
    }

    // Fetch notifications on page load
    fetchNotifications();
});
