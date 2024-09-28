document.addEventListener('DOMContentLoaded', async () => {
    const profileNameElement = document.getElementById('profile-name');
    const profileForm = document.getElementById('profile-form');
    const profilePictureUpload = document.getElementById('profile-picture-upload');
    const profilePictureElement = document.getElementById('profile-picture');

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        console.error('No token or user ID found, redirect to login');
        window.location.href = './login.html'; // Redirect if not logged in
        return;
    }

    // Fetch user data and populate profile fields
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const user = await response.json();
            const { fname, lname, email, role, courses } = user;

            profileNameElement.textContent = `${fname} ${lname}`;
            document.getElementById('fname').value = fname;
            document.getElementById('lname').value = lname;
            document.getElementById('email').value = email;
            document.getElementById('role').value = role;
            document.getElementById('courses').value = courses || '';

            console.log('Profile data loaded:', { fname, lname, email, role, courses });
        } else {
            console.error('Failed to fetch user data');
            window.location.href = './login.html'; // Redirect if fetch fails
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    // File input and preview
    profilePictureElement.addEventListener('click', () => {
        profilePictureUpload.click();
        console.log('Profile picture upload clicked');
    });

    profilePictureUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePictureElement.src = e.target.result;
                console.log('Profile picture changed:', file.name);
            };
            reader.readAsDataURL(file);
        }
    });

    // Update profile form with FormData
    profileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value; // Optional field
        const courses = document.getElementById('courses').value;
        const profilePictureFile = profilePictureUpload.files[0];

        // Prepare form data
        const formData = new FormData();
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('email', email);
        formData.append('password', password); // Optional
        formData.append('courses', courses);

        if (profilePictureFile) {
            formData.append('profilePicture', profilePictureFile); // Append profile picture if uploaded
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData, // Use formData instead of JSON
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                console.log('Profile updated successfully');
            } else {
                const errorData = await response.json();
                alert('Error updating profile: ' + errorData.message);
                console.error('Error updating profile:', errorData);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
        }
    });
});
