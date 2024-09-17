window.onload = function() {
    // Retrieve the user ID from localStorage
    const userId = localStorage.getItem('userId');
    
    // Check if the user ID is available
    if (!userId) {
        console.error('User ID not found in localStorage');
        return;
    }

    // Fetch availability from API
    fetch(`/api/availability/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Load saved times into the form
            for (let day in data) {
                if (data[day]) {
                    document.getElementById(day + '-start').value = data[day].start;
                    document.getElementById(day + '-end').value = data[day].end;
                    document.getElementById(day + '-start').disabled = true;
                    document.getElementById(day + '-end').disabled = true;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching availability:', error);
        });
};

// Enable editing for a specific day
function editTime(day) {
    document.getElementById(day + '-start').disabled = false;
    document.getElementById(day + '-end').disabled = false;
}

document.getElementById('availabilityForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Create the confirmation dialog
    let confirmation = confirm("Are you sure you want to save your availability?");
    
    if (confirmation) {
        // If the user clicks "Yes"
        saveAvailability();
    }
});

function saveAvailability() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error('User ID not found in localStorage');
        return;
    }

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const availability = {};

    days.forEach(day => {
        const startTime = document.getElementById(day + '-start').value;
        const endTime = document.getElementById(day + '-end').value;

        if (startTime && endTime) {
            if (!availability[day]) {
                availability[day] = [];
            }
            availability[day].push({ start: startTime, end: endTime });
        }
    });

    fetch(`http://localhost:3000//api/availability/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(availability)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        alert('Availability saved successfully');
        location.reload(); // Refresh the page to show the editable form again
    })
    .catch(error => {
        console.error('Error saving availability:', error);
    });
}
