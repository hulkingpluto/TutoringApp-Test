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
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
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

    // Update profile form
    profileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value; // Optional field
        const courses = document.getElementById('courses').value;
        const profilePictureFile = profilePictureUpload.files[0];


        const profileData = {
            email: email,
            password: password,
            fname:fname,
            lname:lname,
            courses:courses,
        };
        
        console.log('Submitting profile update with data:', { fname, lname, email, password, courses, profilePictureFile: profilePictureFile?.name });

        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(profileData),
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
