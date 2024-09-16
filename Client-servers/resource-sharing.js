document.addEventListener("DOMContentLoaded", function() {
    // Attach event listener to the form submit button
    document.querySelector('.upload-url-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        // Get the form values
        const urlName = document.getElementById('urlName').value;
        const urlDescription = document.getElementById('urlDescription').value;
        const url = document.getElementById('url').value;
        const userId = localStorage.getItem('userId'); 

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
            uploadedBy: userId, // Use the actual user ID
        };

        try {
            const response = await fetch('http://localhost:3000/api/resources', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
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

// Display Whatever is in the db
document.addEventListener("DOMContentLoaded", function () {
    // Attach event listener to the form submission or file upload event
    document.getElementById('upload').addEventListener('change', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const fileInput = document.getElementById('upload');
        const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage

        // Validate if a file is selected
        if (fileInput.files.length === 0) {
            alert('Please select a file.');
            return;
        }

        // Create a new FormData object to handle the file upload
        const formData = new FormData();
        formData.append('file', fileInput.files[0]); // Add the file to FormData
        formData.append('uploadedBy', userId); // Use the actual user ID

        try {
            const response = await fetch('http://localhost:3000/api/resourcesfile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
                },
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

document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage

    // Function to fetch resources from the backend
    const fetchResources = async (url) => {
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

    // Function to delete a resource or file
    const deleteResource = async (id, type) => {
        const url = type === 'resource' ? `http://localhost:3000/api/resources/${id}` : `http://localhost:3000/api/resourcesfile/${id}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the resource');
            }

            alert('Resource deleted successfully!');
            // Refresh the list after deletion
            const resources = await fetchResources('http://localhost:3000/api/resources');
            const files = await fetchResources('http://localhost:3000/api/resourcesfile');
            renderResources(resources, files);
        } catch (error) {
            console.error('Error deleting resource:', error);
            alert('An error occurred while deleting the resource.');
        }
    };

    // Function to render resources into the DOM
    const renderResources = (resources, files) => {
        const resourceList = document.querySelector('.resource-list ul');
        resourceList.innerHTML = ''; // Clear the list first

        // Render string-based resources
        resources.forEach(resource => {
            if (resource.uploadedBy === userId) {
                const resourceItem = document.createElement('li');
                const resourceLink = document.createElement('a');
                resourceLink.href = resource.fileUrl;
                resourceLink.textContent = `${resource.title} - ${resource.description || 'No description'}`;
                
                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'x';
                deleteButton.classList.add('delete-btn');
                deleteButton.onclick = () => deleteResource(resource._id, 'resource');
                
                resourceItem.appendChild(resourceLink);
                resourceItem.appendChild(deleteButton);
                resourceList.appendChild(resourceItem);
            }
        });

        // Render file-based resources
        files.forEach(file => {
            if (file.uploadedBy === userId) {
                const fileItem = document.createElement('li');
                const fileLink = document.createElement('a');
                fileLink.href = `http://localhost:3000/api/resourcesfile/${file._id}`; // Adjust URL as needed for file access
                fileLink.textContent = `${file.file.originalName}`;
                
                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'x';
                deleteButton.classList.add('delete-btn');
                deleteButton.onclick = () => deleteResource(file._id, 'file');
                
                fileItem.appendChild(fileLink);
                fileItem.appendChild(deleteButton);
                resourceList.appendChild(fileItem);
            }
        });
    };

    // Fetch resources and files on page load
    const resources = await fetchResources('http://localhost:3000/api/resources');
    const files = await fetchResources('http://localhost:3000/api/resourcesfile');
    renderResources(resources, files);
});
