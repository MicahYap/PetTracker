import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Notification() {
  const [flag, setFlag] = useState(false);
  const [notification, setNotification] = useState([]);
  const [petNames, setPetNames] = useState({});
  const [bell, setBell] = useState([]); // Stores unread notifications
  const token = localStorage.getItem('token');
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

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
        setPetNames(petNamesMap);
      } catch (error) {
        alert('Error fetching pets: ' + error.message);
      }
    };
    fetchPetNames();
  }, [token]);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
  
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
            const notificationId = `${pet.id}-groomer-${groomer.id}`;
            const existingNotification = storedNotifications.find(notif => notif.id === notificationId);
  
            notifications.push({
              id: notificationId,
              name: petNames[pet.id] || pet.name,
              type: 'Grooming',
              date: groomer.next_visit,
              read: existingNotification ? existingNotification.read : false // Preserve existing read status
            });
          });
  
          vets.forEach(vet => {
            const notificationId = `${pet.id}-vet-${vet.id}`;
            const existingNotification = storedNotifications.find(notif => notif.id === notificationId);
  
            notifications.push({
              id: notificationId,
              name: petNames[pet.id] || pet.name,
              type: 'Vet',
              date: vet.next_visit,
              read: existingNotification ? existingNotification.read : false // Preserve existing read status
            });
          });
  
          vaccines.forEach(vaccine => {
            const notificationId = `${pet.id}-vaccine-${vaccine.id}`;
            const existingNotification = storedNotifications.find(notif => notif.id === notificationId);
  
            notifications.push({
              id: notificationId,
              name: petNames[pet.id] || pet.name,
              type: 'Vaccine',
              date: vaccine.next_visit,
              read: existingNotification ? existingNotification.read : false // Preserve existing read status
            });
          });
        }
  
        setNotification(notifications);
        localStorage.setItem('notifications', JSON.stringify(notifications));
 
        setBell(notifications.filter(notif => !notif.read));
      } catch (error) {
        alert('Error fetching notifications: ' + error.message);
      }
    };
  
    if (Object.keys(petNames).length > 0) {
      fetchNotifications();
    }
  }, [token, petNames, today]);
  


  const whenClicked = () => {
    setFlag(!flag);
  };

  const handleNotificationClick = (id) => {
    const updatedNotifications = notification.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotification(updatedNotifications);
    const unreadNotifications = updatedNotifications.filter((notif) => !notif.read);
    setBell(unreadNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };
  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedNotifications = localStorage.getItem('notifications');
  
        if (storedNotifications) {
          const parsedNotifications = JSON.parse(storedNotifications);
          setNotification(parsedNotifications);
  
          const unreadNotifications = parsedNotifications.filter((notif) => !notif.read);
          setBell(unreadNotifications);
        } else {
          const response = await axios.get('http://localhost:3001/pets', {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          const pets = response.data;
          const notifications = [];
  
         
          const newNotifications = notifications.map((notif) => ({ ...notif, read: false }));
          
          setNotification(newNotifications);
          setBell(newNotifications);
  

          localStorage.setItem('notifications', JSON.stringify(newNotifications));
        }
      } catch (error) {
        alert('Error fetching notifications: ' + error.message);
      }

     fetchNotifications();
     
    };
    
  }, [token, petNames, today]);
  
  

  return (
    <>
      <div className="relative">
        <div className="relative text-white focus:outline-none">
          <button onClick={whenClicked}>
            <FontAwesomeIcon icon={faBell} className="text-2xl" />
          </button>
          {bell.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-2 py-1">
              {bell.length}
            </div>
          )}
        </div>
        {flag && (
          <div className="absolute left-18 mt-2 w-64 h-80 bg-white rounded-lg shadow-lg z-50 overflow-y-scroll">
            <h3 className="text-center text-lg mt-4 font-semibold mb-2">Notifications</h3>
            <div className="p-4">
              {notification.length > 0 ? (
                notification.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => handleNotificationClick(entry.id)}
                    className="flex flex-row flex-col-reverse justify-around text-slate-900 text-sm font-bold mb-4 border-b border-gray-200 pb-2"
                  >
                    <p className={entry.read ? '' : 'bg-pink-200'}>
                      {entry.name} is due for {entry.type}
                    </p>
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
