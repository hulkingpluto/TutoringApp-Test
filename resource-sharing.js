document.addEventListener("DOMContentLoaded", function() {
    // Attach event listener to the form submit button
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
            uploadedBy: '64fabb90e429b5c4382fb838'
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
});


//Display Whatever is in the db

document.addEventListener("DOMContentLoaded", async function() {
    // Function to fetch URL resources from the backend
    const fetchUrlResources = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/resources'); // Replace with your actual API URL for URLs
            if (!response.ok) {
                throw new Error('Failed to fetch URL resources');
            }
            const urlResources = await response.json();
            return urlResources;
        } catch (error) {
            console.error('Error fetching URL resources:', error);
            return [];
        }
    };

    // Function to fetch file resources from the backend
    const fetchFileResources = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/resourcesfile'); // Replace with your actual API URL for files
            if (!response.ok) {
                throw new Error('Failed to fetch file resources');
            }
            const fileResources = await response.json();
            return fileResources;
        } catch (error) {
            console.error('Error fetching file resources:', error);
            return [];
        }
    };

    // Function to render resources into the DOM
    const renderResources = (resources) => {
        const resourceList = document.querySelector('.resource-list ul');
        resourceList.innerHTML = ''; // Clear the list first

        resources.forEach(resource => {
            const resourceItem = document.createElement('li');
            const resourceLink = document.createElement('a');

            // Check if the resource is a URL or file
            if (resource.fileUrl) {
                resourceLink.href = resource.fileUrl; // Regular URL link
                resourceLink.textContent = `${resource.title} - ${resource.description || 'No description'} (URL)`;
            } else if (resource.filePath) {
                resourceLink.href = `http://localhost:3000/${resource.filePath}`; // Adjust the path for files
                resourceLink.textContent = `${resource.title} - ${resource.description || 'No description'} (File)`;
            }

            resourceItem.appendChild(resourceLink);
            resourceList.appendChild(resourceItem);
        });
    };

    // Fetch and display resources from both endpoints on page load
    try {
        const urlResources = await fetchUrlResources();
        const fileResources = await fetchFileResources();

        // Combine both URL and file resources into one array
        const allResources = [...urlResources, ...fileResources];
        
        // Render the combined resources
        renderResources(allResources);
    } catch (error) {
        console.error('Error fetching and rendering resources:', error);
    }
});


/* Posting documents */
document.addEventListener("DOMContentLoaded", function () {
    // Attach event listener to the form submission or file upload event
    document.getElementById('upload').addEventListener('change', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const fileInput = document.getElementById('upload');

        // Validate if a file is selected
        if (fileInput.files.length === 0) {
            alert('Please select a file.');
            return;
        }

        // Create a new FormData object to handle the file upload
        const formData = new FormData();
        formData.append('file', fileInput.files[0]); // Add the file to FormData
        formData.append('uploadedBy', '64fabb90e429b5c4382fb838'); // Example user ID, replace with actual ID

        try {
            const response = await fetch('http://localhost:3000/api/resourcesfile', {
                method: 'POST',
                body: formData, // Use FormData instead of JSON.stringify
            });

            if (response.ok) {
                const data = await response.json();
                alert('DOC submitted successfully!');
                console.log('New resource created:', data);
            } else {
                const errorData = await response.json();
                alert('Error submitting DOC: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error submitting DOC:', error);
            alert('An error occurred while submitting the DOC.');
        }
    });
});
