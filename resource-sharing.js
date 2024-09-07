document.querySelector('.upload-url-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const urlName = document.getElementById('urlName').value;
    const urlDescription = document.getElementById('urlDescription').value;
    const url = document.getElementById('url').value;

    const newResource = {
        title: urlName,
        description: urlDescription,
        fileUrl: url,
        uploadedBy: 'USER_ID'  // Replace with the actual user ID
    };

    try {
        const response = await fetch('mongodb://localhost:27017/Testdb', {
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
