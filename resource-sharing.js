
document.addEventListener("DOMContentLoaded", function() {
    
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




document.addEventListener("DOMContentLoaded", async function() {
    
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

    
    const renderResources = (resources) => {
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
    };

    
    const resources = await fetchResources();
    renderResources(resources);
});
