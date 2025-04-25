// Fetch the content.json file and dynamically create the navigation bar
fetch('content.json')
  .then(response => response.json())
  .then(data => {
    const navbar = document.getElementById('dynamic-navbar');
    const truckBrands = data.trucks.map(truck => truck.name);

    // Create navigation buttons
    truckBrands.forEach(brand => {
      const button = document.createElement('button');
      button.textContent = brand;
      button.className = 'nav-button';
      button.addEventListener('click', () => {
        alert(`You clicked on ${brand}`);
      });
      navbar.appendChild(button);
    });
  })
  .catch(error => console.error('Error loading content.json:', error));