document.addEventListener('DOMContentLoaded', async () => {
    const updateForm = document.getElementById('update-form');
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
            const { fname, lname, email, qualifications, subjects, profilePicture } = user;

            document.getElementById('fname').value = fname || '';
            document.getElementById('lname').value = lname || '';
            document.getElementById('email').value = email || '';
            document.getElementById('qualification').value = qualifications ? qualifications.join(', ') : '';
            document.getElementById('subjects').value = subjects ? subjects.join(', ') : '';

            if (profilePicture && profilePicture.data) {
                profilePictureElement.src = `data:${profilePicture.contentType};base64,${profilePicture.data}`;
            } else {
                profilePictureElement.src = ''; // Default image or placeholder
            }

            console.log('Profile data loaded:', { fname, lname, email, qualifications, subjects });
        } else {
            console.error('Failed to fetch user data');
            window.location.href = './login.html'; // Redirect if fetch fails
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    // Handle file input and preview
    profilePictureUpload.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async function (e) {
                profilePictureElement.src = e.target.result;
                console.log('Profile picture changed:', file.name);

                try {
                    const response = await fetch(`http://localhost:3000/api/users/${userId}/profile-picture`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            profilePicture: {
                                data: e.target.result.split(',')[1], // Base64 data
                                contentType: file.type,
                                originalName: file.name
                            }
                        }),
                    });

                    if (response.ok) {
                        console.log('Profile picture updated successfully');
                    } else {
                        const errorData = await response.json();
                        console.error('Error updating profile picture:', errorData);
                    }
                } catch (error) {
                    console.error('Error updating profile picture:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle profile form submission
    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const subjects = document.getElementById('subjects').value.split(',').map(subject => subject.trim());
        const qualifications = document.getElementById('qualification').value.split(',').map(qualification => qualification.trim());

        const profileData = {
            email: email,
            password: password || undefined, // Include password only if provided
            fname: fname,
            lname: lname,
            subjects: subjects,
            qualifications: qualifications,
        };

        

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
