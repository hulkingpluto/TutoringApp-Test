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
    const tutorsSelect = document.getElementById('tutor'); // Use the correct ID for the tutor select element
    tutorsSelect.innerHTML = ''; // Clear existing options

    // Add a placeholder option
    const placeholderOption = document.createElement('option');
    placeholderOption.textContent = 'Select a Tutor';
    placeholderOption.value = '';
    tutorsSelect.appendChild(placeholderOption);

    // Add the available tutors to the select element
    tutors.forEach(tutor => {
        if(tutor.role=='tutor'){
        const tutorOption = document.createElement('option');
        tutorOption.textContent = tutor.fname; // Assuming your tutor object has a 'name' property
        tutorOption.value = tutor._id; // Assuming your tutor object has an '_id' property
        tutorsSelect.appendChild(tutorOption);
        }
    });
};

// Fetch and render tutors on page load
const loadTutors = async () => {
    const availableTutors = await fetchTutors('http://localhost:3000/api/users');
    renderAvailableTutors(availableTutors);
};

// Load tutors when the page is ready
document.addEventListener('DOMContentLoaded', loadTutors);