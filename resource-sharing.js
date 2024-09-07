document.querySelector('.upload-url-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevents the default form submission

    // Get the form values
    const urlName = document.getElementById('urlName').value;
    const urlDescription = document.getElementById('urlDescription').value;
    const url = document.getElementById('url').value;

    // Prepare the resource data
    const newResource = {
        title: urlName,
        description: urlDescription,
        fileUrl: url,
        uploadedBy: '19' // Change this to dynamic user ID if needed
    };

    // Send the data to the server
    try {
        const response = await fetch('https://localhost:3000/api/resources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newResource),
        });

        if (response.ok) {
            const data = await response.json();
            alert('URL submitted successfully!');
            console.log('New resource created:', data);
        } else {
            const errorData = await response.json();
            alert('Error submitting URL: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error submitting URL:', error);
        alert('An error occurred while submitting the URL.');
    }
});
