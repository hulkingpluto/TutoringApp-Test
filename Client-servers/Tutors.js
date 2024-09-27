// File: Tutors.js

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = './login.html';
    } else {
        fetchTutors();
    }
});

async function fetchTutors() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:3000/api/users/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const tutors = data.filter(user => user.role === 'tutor');
            displayTutors(tutors);
        } else {
            console.error('Failed to fetch tutors');
        }
    } catch (error) {
        console.error('Error fetching tutors:', error);
    }
}

async function displayTutors(tutors) {
    const tutorList = document.getElementById('tutor-list');
    const defaultProfilePicture = './Icons/profile2.jpg'; // Path to the default profile picture

    tutors.forEach(tutor => {
        const tutorElement = document.createElement('div');
        tutorElement.className = 'tutor-card';
        tutorElement.dataset.tutorId = tutor._id; // Store tutor ID for later use

        let profilePicture = defaultProfilePicture;

        if (tutor.profilePicture) {
            profilePicture = tutor.profilePicture; // Assuming profilePicture is a URL or path
        }

        tutorElement.innerHTML = `
            <img src="${profilePicture}" alt="${tutor.fname} ${tutor.lname}" class="tutor-image">
            <div class="tutor-details">
                <h3>${tutor.fname} ${tutor.lname}</h3>
                <p><strong>Subjects:</strong> ${tutor.subjects.join(', ')}</p>
                <p><strong>Qualifications:</strong> ${tutor.qualifications.join(', ')}</p>
            </div>
        `;

        tutorElement.addEventListener('click', () => {
            window.location.href = `TutorDetails.html?tutorId=${tutor._id}`;
        });

        tutorList.appendChild(tutorElement);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tutorId = urlParams.get('tutorId');
    const token = localStorage.getItem('token');

    if (!tutorId || !token) {
        console.error('No tutor ID or token found');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/users/${tutorId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const tutor = await response.json();
            const { fname, lname, profilePicture } = tutor;

            const profilePictureElement = document.getElementById('tutor-profile-picture');
            const tutorNameElement = document.getElementById('tutor-name');
            const tutorAvailabilityElement = document.getElementById('tutor-availability');

            // Use the profile picture or default if not available
            profilePictureElement.src = profilePicture ? profilePicture : './Icons/profile2.jpg';
            tutorNameElement.textContent = `${fname} ${lname}`;

            // Fetch and display availability times
            const availabilityResponse = await fetch(`http://localhost:3000/api/users/${tutorId}/availability`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (availabilityResponse.ok) {
                const availability = await availabilityResponse.json();
                tutorAvailabilityElement.innerHTML = availability.map(time => `
                    <div class="availability-time">${time}</div>
                `).join('');
            } else {
                console.error('Failed to fetch availability times');
            }

            document.getElementById('tutor-details').classList.remove('hidden');
        } else {
            console.error('Failed to fetch tutor data');
            window.location.href = './login.html'; // Redirect to login if tutor data fetch fails
        }
    } catch (error) {
        console.error('Error fetching tutor details:', error);
    }
});

function closeTutorDetails() {
    document.getElementById('tutor-details').classList.add('hidden');
    window.location.href = './AvailableTutors.html';
}
