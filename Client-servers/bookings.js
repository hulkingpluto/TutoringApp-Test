// Fetch the tutors from the database
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

const fetchTutors = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch from ${url}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching from ${url}:, error`);
        return [];
    }
};

// Render the available tutors into the select dropdown
const renderAvailableTutors = (tutors) => {
    const tutorsSelect = document.getElementById('tutor');
    tutorsSelect.innerHTML = ''; // Clear the previous options

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

// Load tutors and set the selected tutor from localStorage
const loadTutors = async () => {
    const availableTutors = await fetchTutors(`${API_BASE_URL}/users`);
    renderAvailableTutors(availableTutors);

    // Get the selected tutor from localStorage
    const selectedTutor = JSON.parse(localStorage.getItem('selectedTutor'));

    // Check if a tutor was previously selected
    if (selectedTutor) {
        // Populate the tutor select element
        const tutorSelect = document.getElementById('tutor');
        
        // Iterate through the options to find the one that matches the selected tutor's ID
        for (let option of tutorSelect.options) {
            if (option.value === selectedTutor._id) {
                option.selected = true; // Set the correct option as selected
                break;
            }
        }

        // Populate the subject field with the selected tutor's subject
        const subjectInput = document.getElementById('subject');
        subjectInput.value = selectedTutor.subjects[0]; // Assuming you're using the first subject
    }
};

// Booking a schedule
document.addEventListener('DOMContentLoaded', async () => {
    // Load tutors on page load
    await loadTutors();

    // Handle form submission
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const student = localStorage.getItem('userId'); 
        const tutor = document.getElementById('tutor').value;
        const subject = document.getElementById('subject').value;
        const sessionDate = document.getElementById('sessionDate').value;
        const sessionTime = document.getElementById('sessionTime').value;
        const duration = document.getElementById('duration').value;
        const status = document.getElementById('status').value;
        const meetingtype = document.getElementById('status').value;

        // Prepare booking data to match the format expected by the database
        const bookingData = {
            student: student,
            tutor: tutor,
            subject: subject,
            sessionDate: sessionDate,
            sessionTime: sessionTime,
            duration: parseInt(duration) * 60, // Assuming you want duration in minutes
            status: status,
            meetingtype:meetingtype
        };

        try {
            // Send POST request to the booking API
            const response = await fetch(`${API_BASE_URL}/bookings`, {
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
                localStorage.removeItem('bookingTutor');
                localStorage.removeItem('selectedSubject');
                localStorage.removeItem('selectedTutor');

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