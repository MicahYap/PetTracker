import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Notification() {
  const [flag, setFlag] = useState(false);
  const [notification, setNotification] = useState([]);
  const [petNames, setPetNames] = useState({});
  const token = localStorage.getItem('token');
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  const whenClicked = () => {
    setFlag(!flag);
  };

  useEffect(() => {
    const fetchPetNames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/pets', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const pets = response.data;
        const petNamesMap = {};

        // Store pet names in a map
        pets.forEach(pet => {
          petNamesMap[pet.id] = pet.name;
        });

        setPetNames(petNamesMap); // Update state with pet names map
      } catch (error) {
        alert('Error fetching pets: ' + error.message);
      }
    };

    fetchPetNames();
  }, [token]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3001/pets', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const pets = response.data;
        const notifications = [];

        for (const pet of pets) {
          const [groomersResponse, vetsResponse, vaccinesResponse] = await Promise.all([
            axios.get(`http://localhost:3001/pets/${pet.id}/groomers`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`http://localhost:3001/pets/${pet.id}/vets`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`http://localhost:3001/pets/${pet.id}/vaxs`, { headers: { Authorization: `Bearer ${token}` } }),
          ]);

          const groomers = groomersResponse.data;
          const vets = vetsResponse.data;
          const vaccines = vaccinesResponse.data;

          // Check for grooming notifications
          groomers.forEach(groomer => {
            if (groomer.next_visit === today) {
              notifications.push({
                id: `${pet.id}-groomer-${groomer.id}`,
                name: petNames[pet.id] || pet.name, // Use pet name from the petNames map if available
                type: 'Grooming',
                date: groomer.next_visit,
              });
            }
          });

          // Check for vet notifications
          vets.forEach(vet => {
            if (vet.next_visit === today) {
              notifications.push({
                id: `${pet.id}-vet-${vet.id}`,
                name: petNames[pet.id] || pet.name, // Use pet name from the petNames map if available
                type: 'Vet',
                date: vet.next_visit,
              });
            }
          });

          // Check for vaccine notifications
          vaccines.forEach(vaccine => {
            if (vaccine.next_visit === today) {
              notifications.push({
                id: `${pet.id}-vaccine-${vaccine.id}`,
                name: petNames[pet.id] || pet.name, // Use pet name from the petNames map if available
                type: 'Vaccine',
                date: vaccine.next_visit,
              });
            }
          });
        }

        setNotification(notifications);
      } catch (error) {
        alert('Error fetching notifications: ' + error.message);
      }
    };

    if (Object.keys(petNames).length > 0) { // Ensure petNames is populated before fetching notifications
      fetchNotifications();
    }
  }, [token, petNames, today]);

  return (
    <>
      <button onClick={whenClicked}>
        {flag ? (
          <>
            <div className="relative text-white focus:outline-none">
              <FontAwesomeIcon icon={faBell} className="text-2xl" />
            </div>
            <div className="absolute left-20 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 overflow-y-scroll">
              <h3 className="text-lg mt-4 font-semibold mb-2">Notifications</h3>
              <div className="p-4 flex flex-col-reverse">
                
                {notification.length > 0 ? (
                notification.map((entry) => (
                  <div key={entry.id} className="flex flex-row flex-col-reverse justify-around text-slate-900 text-sm font-bold mb-4 border-b border-gray-200 pb-2">
                    <p> {entry.name} is due for {entry.type}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No new notifications</p>
              )}
              </div>
            </div>
          </>
        ) : (
          <div className="relative text-white focus:outline-none">
            <FontAwesomeIcon icon={faBell} className="text-2xl" />
          </div>
        )}
      </button>
    </>
  );
}

export default Notification;
