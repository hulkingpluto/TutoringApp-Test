document.addEventListener("DOMContentLoaded", function() {
    // Attach event listener to the form submit button
    document.querySelector('.upload-url-form').addEventListener('submit', async function (event) {
        event.preventDefault(); 

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
    // Function to fetch resources from the backend
    const fetchResources = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/resources');
            if (!response.ok) {
                throw new Error('Failed to fetch resources');
            }
            const resources = await response.json();
            return resources;
        } catch (error) {
            console.error('Error fetching resources:', error);
            return [];
        }
    };

    const fetchResourcesFiles = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/resourcefile');
            if (!response.ok) {
                throw new Error('Failed to fetch resources');
            }
            const resourcesfile = await response.json();
            return resourcesfile;
        } catch (error) {
            console.error('Error fetching resources:', error);
            return [];
        }
    }

    const urls = fetchResources();
    const files = fetchResourcesFiles();

    const objectToDisplay = {...urls, ...files}

    // Function to delete a resource from the backend
    const deleteResource = async (resourceId, isFile) => {
        const apiEndpoint = isFile ? `http://localhost:3000/api/resourcesfile/${resourceId}` : `http://localhost:3000/api/resources/${resourceId}`;
        
        try {
            const response = await fetch(apiEndpoint, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Resource deleted successfully!');
                return true; // Return true if deletion was successful
            } else {
                const errorData = await response.json();
                alert('Error deleting resource: ' + errorData.message);
                return false; // Return false if deletion failed
            }
        } catch (error) {
            console.error('Error deleting resource:', error);
            alert('An error occurred while deleting the resource.');
            return false;
        }
    };


    // Function to render resources into the DOM
    const renderResources = (resources) => {
        const resourceList = document.querySelector('.resource-list ul');
        resourceList.innerHTML = ''; // Clear the list first

        resources.forEach(resource => {
            const resourceItem = document.createElement('li');
            const resourceLink = document.createElement('a');
            const deleteButton = document.createElement('button'); // Create delete button

            // Check if the resource is a URL or file
            if (resource.fileUrl) {
                resourceLink.href = resource.fileUrl; // Regular URL link
                resourceLink.textContent = `${resource.title} - ${resource.description || 'No description'} (URL)`;
            } else if (resource.filePath) {
                resourceLink.href = `http://localhost:3000/${resource.filePath}`; // Adjust the path for files
                resourceLink.textContent = `${resource.title} - ${resource.description || 'No description'} (File)`;
            }

            // Add delete button
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                const isFile = !!resource.filePath; // Check if it's a file resource
                const isDeleted = await deleteResource(resource._id, isFile); // Call the delete function

                if (isDeleted) {
                    resourceItem.remove(); // Remove the item from the DOM on successful deletion
                }
            });

            resourceItem.appendChild(resourceLink);
            resourceItem.appendChild(deleteButton); // Append delete button to the item
            resourceList.appendChild(resourceItem);
        });
    };

    // Fetch and display resources from both endpoints on page load
    try {
        const [urls, files] = await Promise.all([fetchResources(), fetchResourcesFiles()]);

        // Combine both URL and file resources into one array
        const objectToDisplay = [...urls, ...files];

        // Render the combined resources
        renderResources(objectToDisplay);

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
            const response = await fetch('http://localhost:3000/api/resourcefile', {
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
