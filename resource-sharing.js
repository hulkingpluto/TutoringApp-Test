document.addEventListener("DOMContentLoaded", async function () {
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
        });

        // Render file-based resources
        files.forEach(file => {
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
        });
    };

    // Fetch resources and files on page load
    const resources = await fetchResources('http://localhost:3000/api/resources');
    const files = await fetchResources('http://localhost:3000/api/resourcesfile');
    renderResources(resources, files);
});
