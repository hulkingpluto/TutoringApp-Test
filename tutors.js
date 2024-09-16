document.addEventListener('DOMContentLoaded', () => {
    const tutorList = document.getElementById('tutor-list');

    // Mock data
    const mockTutors = [
        {
            profilePicture: {
                data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/2A11gAAAABJRU5ErkJggg==",
                contentType: "image/png",
                originalName: "profile1.png"
            },
            firstName: "John",
            lastName: "Doe",
            availability: [
                {
                    date: "Monday",
                    slots: ["10:00 - 12:00", "14:00 - 16:00"]
                },
                {
                    date: "Wednesday",
                    slots: ["09:00 - 11:00"]
                }
            ]
        },
        {
            profilePicture: null,
            firstName: "Jane",
            lastName: "Smith",
            availability: [
                {
                    date: "Tuesday",
                    slots: ["13:00 - 15:00"]
                },
                {
                    date: "Thursday",
                    slots: ["11:00 - 13:00"]
                }
            ]
        }
    ];

    // Display tutors and their availability
    const displayTutors = (tutors) => {
        tutorList.innerHTML = '';

        tutors.forEach(tutor => {
            const tutorCard = document.createElement('div');
            tutorCard.className = 'section';

            // Set profile picture
            const profilePicture = tutor.profilePicture
                ? `data:${tutor.profilePicture.contentType};base64,${tutor.profilePicture.data}`
                : './Icons/default-profile.png'; // Default picture

            tutorCard.innerHTML = `
                <img src="${profilePicture}" alt="${tutor.firstName} ${tutor.lastName}">
                <h2>${tutor.firstName} ${tutor.lastName}</h2>
                <p>Available on:</p>
                ${displayAvailability(tutor.availability)}
            `;

            tutorList.appendChild(tutorCard);
        });
    };

    // Create availability HTML
    const displayAvailability = (availability) => {
        if (!availability || availability.length === 0) {
            return '<p>No availability data.</p>';
        }

        return availability.map(avail => `
            <div>
                <strong>${avail.date}:</strong>
                <ul>
                    ${avail.slots.map(slot => `<li>${slot}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    };

    // Call displayTutors with mock data
    displayTutors(mockTutors);
});
