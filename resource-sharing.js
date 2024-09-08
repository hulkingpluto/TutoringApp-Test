<<<<<<< HEAD

document.addEventListener("DOMContentLoaded", function() {
    
    document.querySelector('.upload-url-form').addEventListener('submit', async function (event) {
        event.preventDefault(); 

        
        const urlName = document.getElementById('urlName').value;
        const urlDescription = document.getElementById('urlDescription').value;
        const url = document.getElementById('url').value;

        
=======
document.addEventListener("DOMContentLoaded", function() {
    // Attach event listener to the form submit button
    document.querySelector('.upload-url-form').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevents the default form submission

        // Get the form values
        const urlName = document.getElementById('urlName').value;
        const urlDescription = document.getElementById('urlDescription').value;
        const url = document.getElementById('url').value;

        // Validate the form fields
>>>>>>> 820a96b269c0a6f2d0d17f55f708daa484c728c0
        if (!urlName || !url || !urlDescription) {
            alert('Please fill in all the required fields.');
            return;
        }

<<<<<<< HEAD
        
=======
        // Prepare the resource data
>>>>>>> 820a96b269c0a6f2d0d17f55f708daa484c728c0
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


<<<<<<< HEAD


document.addEventListener("DOMContentLoaded", async function() {
    
    const fetchResources = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/resources'); 
=======
//Display Whatever is in the db

document.addEventListener("DOMContentLoaded", async function() {
    // Function to fetch resources from the backend
    const fetchResources = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/resources'); // Replace with your actual API URL
>>>>>>> 820a96b269c0a6f2d0d17f55f708daa484c728c0
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

<<<<<<< HEAD
    
    const renderResources = (resources) => {
        const resourceList = document.querySelector('.resource-list ul');
        resourceList.innerHTML = ''; 
=======
    // Function to render resources into the DOM
    const renderResources = (resources) => {
        const resourceList = document.querySelector('.resource-list ul');
        resourceList.innerHTML = ''; // Clear the list first
>>>>>>> 820a96b269c0a6f2d0d17f55f708daa484c728c0
        resources.forEach(resource => {
            const resourceItem = document.createElement('li');
            const resourceLink = document.createElement('a');
            resourceLink.href = resource.fileUrl;
            resourceLink.textContent = `${resource.title} - ${resource.description || 'No description'}`;
            resourceItem.appendChild(resourceLink);
            resourceList.appendChild(resourceItem);
        });
    };

<<<<<<< HEAD
    
=======
    // Fetch and display resources on page load
>>>>>>> 820a96b269c0a6f2d0d17f55f708daa484c728c0
    const resources = await fetchResources();
    renderResources(resources);
});

