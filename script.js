

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  const map = L.map("map").setView([51.505, -0.09], 13);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
  }).addTo(map);

  let marker;

  // Function to handle live location for SOS
  async function handleSOS() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;

              // Remove previous marker if it exists
              if (marker) map.removeLayer(marker);

              // Add SOS marker on the map
              marker = L.marker([latitude, longitude], { icon: redIcon() }).addTo(map)
                  .bindPopup("<strong>SOS Alert!</strong><br>Your live location.")
                  .openPopup();

              map.setView([latitude, longitude], 14);

              // Create a prioritized notification for SOS
              const timestamp = new Date().toLocaleString();
              const summaryList = document.getElementById("incidentSummary");

              const listItem = document.createElement("li");
              listItem.classList.add("notification-item", "sos-alert");
              listItem.innerHTML = `<strong>SOS Alert!</strong> at Live Location <br><small>Reported: ${timestamp}</small>`;

              // Highlight this item
              listItem.style.border = "2px solid red";
              listItem.style.backgroundColor = "#ffeaea";

              // Append this SOS notification to the top
              summaryList.prepend(listItem);
          }, (error) => {
              alert(`Error getting location: ${error.message}`);
          });
      } else {
          alert("Geolocation is not supported by your browser.");
      }
  }

  // Red icon for SOS marker
  function redIcon() {
      return new L.Icon({
          iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
      });
  }

  // Handle SOS button click
  document.getElementById("sosButton").addEventListener("click", handleSOS);

  // Form submission handler
  document.getElementById("incidentForm").addEventListener("submit", async (event) => {
      event.preventDefault();

      const location = document.getElementById("location").value;
      const incidentType = document.getElementById("incidentType").value;
      const incidentDetails = document.getElementById("incidentDetails").value;
      const imageUpload = document.getElementById("imageUpload").files[0];

      if (location && incidentType) {
          try {
              const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
              const geocodeData = await geocodeResponse.json();

              if (geocodeData.length > 0) {
                  const { lat, lon } = geocodeData[0];

                  // Remove previous marker if it exists
                  if (marker) map.removeLayer(marker);

                  // Add a new marker to the map
                  marker = L.marker([lat, lon]).addTo(map)
                      .bindPopup(`<strong>Incident: ${incidentType}</strong><br>Location: ${location}`)
                      .openPopup();

                  map.setView([lat, lon], 14);

                  // Display the incident as a clickable list item
                  const summaryList = document.getElementById("incidentSummary");
                  const timestamp = new Date().toLocaleString();

                  const listItem = document.createElement("li");
                  listItem.classList.add("notification-item");
                  listItem.innerHTML = `<strong>${incidentType}</strong> at ${location} <br><small>Reported: ${timestamp}</small>`;

                  // Add dropdown toggle for details
                  const detailsDiv = document.createElement("div");
                  detailsDiv.classList.add("details-dropdown");
                  detailsDiv.style.display = "none"; // Hidden by default

                  const detailsContent = `
                    <p><strong>Incident Type:</strong> ${incidentType}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Reported At:</strong> ${timestamp}</p>
                    <p><strong>Additional Details:</strong> ${incidentDetails || "None provided"}</p>
                  `;

                  detailsDiv.innerHTML = detailsContent;

                  // Show uploaded image if available
                  if (imageUpload) {
                      const reader = new FileReader();
                      reader.onload = () => {
                          const img = document.createElement("img");
                          img.src = reader.result;
                          img.alt = "Uploaded Image";
                          img.style.maxWidth = "100%";
                          detailsDiv.appendChild(img);
                      };
                      reader.readAsDataURL(imageUpload);
                  }

                  // Toggle visibility on click
                  listItem.addEventListener("click", () => {
                      detailsDiv.style.display = detailsDiv.style.display === "none" ? "block" : "none";
                  });

                  listItem.appendChild(detailsDiv);
                  summaryList.appendChild(listItem);
              }
          } catch (error) {
              console.error("Error fetching location:", error);
          }
      }
  });

  // Reload page when clicking on the "Alertify" header
  document.querySelector(".header-title").addEventListener("click", () => {
      location.reload();
  });

  // Emergency Dropdown Toggle
  const emergencyButton = document.getElementById("emergencyButton");
  const emergencyDropdown = document.getElementById("emergencyDropdown");

  emergencyButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click from reaching document listener
      emergencyDropdown.style.display = emergencyDropdown.style.display === "block" ? "none" : "block";
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
      if (!emergencyDropdown.contains(event.target) && event.target !== emergencyButton) {
          emergencyDropdown.style.display = "none";
      }
  });

  // Make buttons show a pointer cursor on hover
  emergencyButton.style.cursor = "pointer";
  document.getElementById("sosButton").style.cursor = "pointer";
});

document.addEventListener("DOMContentLoaded", function () {
    const openChatButton = document.getElementById("openChat");
    const closeChatButton = document.getElementById("closeChat");
    const chatContainer = document.querySelector(".chat-container");

    // Open chat
    openChatButton.addEventListener("click", function () {
        chatContainer.style.display = "block";  // Show chat window
    });

    // Close chat
    closeChatButton.addEventListener("click", function () {
        chatContainer.style.display = "none";  // Hide chat window
    });
});

