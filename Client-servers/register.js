document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            // Get the form values
            const role = document.getElementById('role') ? document.getElementById('role').value : '';
            const email = document.getElementById('email') ? document.getElementById('email').value : '';
            const password = document.getElementById('password') ? document.getElementById('password').value : '';
            
            // Initialize fname and lname to empty strings
            let fname = '';
            let lname = '';

            // Check if fields are visible before accessing their values
            if (document.getElementById('student-fname') && document.getElementById('student-fname').closest('.hidden') === null) {
                fname = document.getElementById('student-fname').value;
            } else if (document.getElementById('tutor-fname') && document.getElementById('tutor-fname').closest('.hidden') === null) {
                fname = document.getElementById('tutor-fname').value;
            }

            if (document.getElementById('student-lname') && document.getElementById('student-lname').closest('.hidden') === null) {
                lname = document.getElementById('student-lname').value;
            } else if (document.getElementById('tutor-lname') && document.getElementById('tutor-lname').closest('.hidden') === null) {
                lname = document.getElementById('tutor-lname').value;
            }

            const profilePicture = document.getElementById('profilePicture') ? document.getElementById('profilePicture').files[0] : null;

            // Validate the form fields
            if (!role || !email || !password || !fname || !lname) {
                alert('Please fill in all the required fields.');
                return;
            }

            // Prepare form data
            const formData = new FormData();
            formData.append('role', role);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('fname', fname);
            formData.append('lname', lname);

            // Add role-specific fields
            if (role === 'student') {
                const courses = document.querySelectorAll('#courses-group input');
                courses.forEach(course => {
                    if (course.value) {
                        formData.append('courses[]', course.value);
                    }
                });
            } else if (role === 'tutor') {
                const subjects = document.querySelectorAll('#subjects-group input');
                subjects.forEach(subject => {
                    if (subject.value) {
                        formData.append('subjects[]', subject.value);
                    }
                });

                const qualifications = document.querySelectorAll('#qualification-group input');
                qualifications.forEach(qualification => {
                    if (qualification.value) {
                        formData.append('qualifications[]', qualification.value);
                    }
                });
            }

            if (profilePicture) {
                formData.append('profilePicture', profilePicture);
            }

            try {
                const response = await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Registration successful!');
                    window.location.href = './login.html'; // Redirect to the login page after registration
                } else {
                    const errorData = await response.json();
                    alert('Error registering: ' + errorData.message);
                }
            } catch (error) {
                console.error('Error registering:', error);
                alert('An error occurred while registering.');
            }
        });
    }

    const profilePictureInput = document.getElementById('profilePicture');
    const profilePicturePreview = document.getElementById('profilePicturePreview');

    if (profilePictureInput) {
        profilePictureInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profilePicturePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                profilePicturePreview.src = ''; // Clear the preview if no file is selected
            }
        });
    }
});