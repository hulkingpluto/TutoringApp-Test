document.addEventListener("DOMContentLoaded", function() {
    // Attach event listener to the form submit button
    document.querySelector('.upload-url-form').addEventListener('submit', async function (event) {
        event.preventDefault(); 

        
        const urlName = document.getElementById('urlName').value;
        const urlDescription = document.getElementById('urlDescription').value;
        const url = document.getElementById('url').value;

        
        if (!urlName || !url || !urlDescription) {
            alert('Please fill in all the required fields.');
            return;
        }

        
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




document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById('upload').addEventListener('change', async function (event) {
        event.preventDefault();

        const fileInput = document.getElementById('upload');

        
        if (fileInput.files.length === 0) {
            alert('Please select a file.');
            return;
        }

        
        const formData = new FormData();
        formData.append('file', fileInput.files[0]); 
        formData.append('uploadedBy', '64fabb90e429b5c4382fb838'); 

        try {
            const response = await fetch('http://localhost:3000/api/resourcesfile', {
                method: 'POST',
                body: formData, 
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

    const deleteResource = async (resourceId, isFile) => {
        const apiEndpoint = isFile ? `http://localhost:3000/api/resourcesfile/${resourceId}` :` http://localhost:3000/api/resources/${resourceId}`;
        
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

    
    const renderResources = (resources, files) => {
        const resourceList = document.querySelector('.resource-list ul');
        resourceList.innerHTML = ''; 
        
        
        resources.forEach(resource => {
            const resourceItem = document.createElement('li');
            const resourceLink = document.createElement('a');
            resourceLink.href = resource.fileUrl;
            resourceLink.textContent = `${resource.title} - ${resource.description || 'No description'}`;
            resourceItem.appendChild(resourceLink);
            resourceList.appendChild(resourceItem);
        });

        
        files.forEach(file => {
            const fileItem = document.createElement('li');
            const fileLink = document.createElement('a');
            fileLink.href = `http://localhost:3000/api/resourcesfile/${file._id}`; 
            fileLink.textContent = `${file.file.originalName}`;
            fileItem.appendChild(fileLink);
            resourceList.appendChild(fileItem);
        });
    };

    
    const resources = await fetchResources('http://localhost:3000/api/resources');
    const files = await fetchResources('http://localhost:3000/api/resourcesfile');
    renderResources(resources, files);
});

