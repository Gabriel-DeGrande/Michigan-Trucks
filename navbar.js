// Fetch the content.json file and dynamically create the navigation bar
fetch('content.json')
    .then(response => response.json())
    .then(data => {
        const navbar = document.getElementById('dynamic-navbar');
        const truckPictureContainer = document.getElementById('truck-picture-container');
        const truckTableContainer = document.getElementById('truck-table-container');
        const truckDescriptionContainer = document.getElementById('truck-description-container');
        let activeButton = null; // Track the currently active button

        // Create navigation buttons
        data.trucks.forEach((truck, index) => {
            const button = document.createElement('button');
            button.textContent = truck.name;
            button.className = 'nav-button';
            button.addEventListener('click', () => {
                // Highlight the selected button
                if (activeButton) {
                    activeButton.classList.remove('active');
                }
                button.classList.add('active');
                activeButton = button;

                // Load the truck media (image or video)
                if (truck.media.type === 'image') {
                    truckPictureContainer.innerHTML = `<img src="${truck.media.src}" alt="${truck.name}" class="truck-picture">`;
                } else if (truck.media.type === 'video') {
                    truckPictureContainer.innerHTML = `
                        <video controls class="truck-video">
                            <source src="${truck.media.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>`;
                }

                // Load the truck table
                let tableHTML = '<table class="truck-table"><tr><th>Feature</th><th>Value</th></tr>';
                for (const [key, value] of Object.entries(truck.features)) {
                    tableHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
                }
                tableHTML += '</table>';
                truckTableContainer.innerHTML = tableHTML;

                // Load the truck description
                truckDescriptionContainer.innerHTML = `<p class="truck-description">${truck.description}</p>`;
            });
            navbar.appendChild(button);

            // Automatically select the first truck
            if (index === 0) {
                button.click();
            }
        });
    })
    .catch(error => console.error('Error loading content.json:', error));