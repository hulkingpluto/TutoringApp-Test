
// Redirect to Google OAuth route when Google login button is clicked
function handleGoogleLogin() {
    window.location.href = '/auth/google';
}

document.addEventListener('DOMContentLoaded', handleAuthRedirect);


function handleAuthRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('userId');
    
   
    if (token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        console.log('Token and User ID stored in localStorage');
        window.location.href = '/dashboard.html'; // Redirect to the actual dashboard
    } 
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert('Please fill in all the required fields.');
                return;
            }

            const loginData = {
                email: email,
                password: password,
            };

            try {
                const response = await fetch('http://localhost:3000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    alert('Login successful!');
                    window.location.href = './dashboard.html';
                } else {
                    const errorData = await response.json();
                    alert('Error logging in: ' + errorData.message);
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('An error occurred while logging in.');
            }
        });
    } 
});

document.addEventListener('DOMContentLoaded', async () => {
    const profilePictureElement = document.getElementById('profile-picture');
    const profileNameElement = document.getElementById('profile-name');

    // Retrieve user ID and token from localStorage (already stored on login)
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        console.error('No token or user ID found, redirect to login');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const user = await response.json();
            const { fname, lname } = user;

            // Fetch profile picture as a binary stream
            const imageResponse = await fetch(`http://localhost:3000/api/users/${userId}/profile-picture`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (imageResponse.ok) {
                // Create a blob from the binary data
                const blob = await imageResponse.blob();

                // Create a URL for the image blob and set it as the src for the image element
                const imageUrl = URL.createObjectURL(blob);
                profilePictureElement.src = imageUrl;
            } else {
                // If the image cannot be fetched, use the default profile image
                profilePictureElement.src = './Icons/profile2.jpg';
            }

            profileNameElement.textContent = `${fname} ${lname}`;
        } else {
            console.error('Failed to fetch user data');
            window.location.href = './login.html'; // Redirect to login if user data fetch fails
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
