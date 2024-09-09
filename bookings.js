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

//fetch the tutors from db
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

const renderAvailableTutors = (tutors) => {
    const tutorsSelect = document.querySelector('.form-select')
    tutorsSelect.innerHTML = '';

    tutors.forEach(tutor => {
        const tutorName = document.createElement('option');
    })
}

const availableTutors = fetchTutors('http://localhost:3000/api/users');
renderAvailableTutors(availableTutors)

