document.addEventListener("DOMContentLoaded", function () {
    // Attach event listener to the form submit button for URL submission
    document.querySelector('.upload-url-form').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevents the default form submission

        // Get the form values
        const urlName = document.getElementById('urlName').value;
        const urlDescription = document.getElementById('urlDescription').value;
        const url = document.getElementById('url').value;

        // Validate the form fields
        if (!urlName || !url || !urlDescription) {
            alert('Please fill in all the required fields.');
            return;
        }

        // Prepare the resource data
        const newResource = {
            title: urlName,
            description: urlDescription,
            fileUrl: url,
            uploadedBy: '64fabb90e429b5c4382fb838' // Example user ID
        };

        try {
            const response = await fetch('http://localhost:3000/api/resources', {
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

    // Attach event listener to handle file uploads
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('upload');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    // Trigger the hidden file input when the "Upload File" button is clicked
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // Display the file name when a file is selected
    fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = `Selected file: ${fileInput.files[0].name}`;
            fileNameDisplay.style.display = 'block'; // Show the file name
        } else {
            fileNameDisplay.style.display = 'none'; // Hide the file name if no file is selected
        }
    });
});
