import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Notification() {
  const [flag, setFlag] = useState(false);
  const [bellFlag, setBellFlag] =useState(false);
  const [notification, setNotification] = useState([]);
  const [petNames, setPetNames] = useState({});
  const [bell, setBell] = useState([]); // Stores unread notifications
  const token = localStorage.getItem('token');
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // Fetch pet names
  useEffect(() => {
    const fetchPetNames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/pets', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pets = response.data;
        const petNamesMap = {};
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

  // Fetch notifications and update bell
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

          groomers.forEach(groomer => {
            if (groomer.next_visit === today) {
              notifications.push({
                id: `${pet.id}-groomer-${groomer.id}`,
                name: petNames[pet.id] || pet.name,
                type: 'Grooming',
                date: groomer.next_visit,
              });
            }
          });

          vets.forEach(vet => {
            if (vet.next_visit === today) {
              notifications.push({
                id: `${pet.id}-vet-${vet.id}`,
                name: petNames[pet.id] || pet.name,
                type: 'Vet',
                date: vet.next_visit,
              });
            }
          });

          vaccines.forEach(vaccine => {
            if (vaccine.next_visit === today) {
              notifications.push({
                id: `${pet.id}-vaccine-${vaccine.id}`,
                name: petNames[pet.id] || pet.name,
                type: 'Vaccine',
                date: vaccine.next_visit,
              });
            }
          });
        }
        setNotification(notifications);
        
        localStorage.setItem('unread', JSON.stringify(notifications))
        const unread = JSON.parse(localStorage.getItem('unread'))
        setBell(unread);
      } catch (error) {
        alert('Error fetching notifications: ' + error.message);
      }
    };

    if (Object.keys(petNames).length > 0) {
      fetchNotifications();
    }
  }, [token, petNames, today]);

  // Handle bell click
  const whenClicked = () => {
    setFlag(!flag);
  };

  return (
    <>
      <div  className="relative">
        <div className="relative text-white focus:outline-none">
          <button onClick={whenClicked}><FontAwesomeIcon icon={faBell} className="text-2xl" /></button>
          {bell.length > 0 &&(
            <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-2 py-1">
              {bell.length}
            </div>
          )}
        </div>
        {flag && (
          <div className="absolute left-18 mt-2 w-64 h-80 bg-white rounded-lg shadow-lg z-50 overflow-y-scroll">
            <h3 className="text-center text-lg mt-4 font-semibold mb-2">Notifications</h3>
            <div className="p-4 flex flex-col-reverse">
              {notification.length > 0 ? (
                notification.map((entry) => (

                  <button onClick = {()=>{setBellFlag(true)}} key={entry.id} className="flex flex-row flex-col-reverse justify-around text-slate-900 text-sm font-bold mb-4 border-b border-gray-200 pb-2">
                    { bellFlag ? (
                      <p>{entry.name} is due for {entry.type}</p>
                      ) : (
                      <p className='bg-pink-200'>{entry.name} is due for {entry.type}</p>
                      )
                    }
                    
                  </button>
                  
                ))
              ) : (
                <p className="text-gray-600">No new notifications</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Notification;
