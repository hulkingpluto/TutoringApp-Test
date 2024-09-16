// Toggle visibility of cancellation reason field
document.getElementById('status').addEventListener('change', function() {
    const status = this.value;
    const cancellationReasonContainer = document.getElementById('cancellationReasonContainer');
    if (status === 'Cancelled') {
        cancellationReasonContainer.style.display = 'block';
        document.getElementById('cancellationReason').setAttribute('required', 'true');
    } else {
        cancellationReasonContainer.style.display = 'none';
        document.getElementById('cancellationReason').removeAttribute('required');
    }
});

// Fetch the tutors from the database
const fetchTutors = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch from ${url}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        return [];
    }
};

// Render the available tutors into the select dropdown
const renderAvailableTutors = (tutors) => {
    const tutorsSelect = document.getElementById('tutor');
    tutorsSelect.innerHTML = ''; 

    const placeholderOption = document.createElement('option');
    placeholderOption.textContent = 'Select a Tutor';
    placeholderOption.value = '';
    tutorsSelect.appendChild(placeholderOption);

    tutors.forEach(tutor => {
        const tutorOption = document.createElement('option');
        tutorOption.textContent = tutor.fname;
        tutorOption.value = tutor._id; 
        tutorsSelect.appendChild(tutorOption);
    });
};

const loadTutors = async () => {
    const availableTutors = await fetchTutors('http://localhost:3000/api/users');
    renderAvailableTutors(availableTutors);
};

document.addEventListener('DOMContentLoaded', loadTutors);

//Booking a schedule
document.addEventListener('DOMContentLoaded', () => {
    // Load tutors on page load
    loadTutors();

    // Handle form submission
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const student = "66d3c6bea7133bbc3a897ec1";
        const tutor = document.getElementById('tutor').value;
        const subject=document.getElementById('subject').value;
        const sessionDate = document.getElementById('sessionDate').value;
        const sessionTime = document.getElementById('sessionTime').value;
        const duration = document.getElementById('duration').value;
        const status = document.getElementById('status').value;

        // Prepare booking data to match the format expected by the database
        const bookingData = {
            student: student,
            tutor: tutor,
            subject:subject,
            sessionDate: sessionDate,
            sessionTime: sessionTime,
            duration: parseInt(duration) * 60, // Assuming you want duration in minutes
            status: status
        };

        try {
            // Send POST request to the booking API
            const response = await fetch('http://localhost:3000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                // Handle success
                const responseData = await response.json();
                alert('Booking created successfully!');
                console.log('Booking data:', responseData);

                // Optionally, reset the form after submission
                bookingForm.reset();
            } else {
                // Handle errors
                const errorData = await response.json();
                alert('Error creating booking: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('An error occurred while creating the booking.');
        }
    });
});