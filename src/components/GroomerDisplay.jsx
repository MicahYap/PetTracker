import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function GroomerDisplay({ pet, setFlagGroom }) {
  const [reminder, setReminder] = useState('');
  const [date, setDate] = useState('');
  const [groomer, setGroomer] = useState('');
  const [nextVisit, setNextVisit] = useState('');
  const [dateHistory, setDateHistory] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem('token');

  const formatDate = (date) => {
    const newDate = new Date(date);
    return isNaN(newDate.getTime()) ? 'Invalid date' : newDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });
  };

  const saveAction = useCallback(async (e) => {
    e.preventDefault();

    if (!date || !groomer) {
      alert('Please fill in Date and Groomer fields.');
      return;
    }

    let selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      console.error("Invalid Date:", date);
      return;
    }

    const reminderDays = parseInt(reminder, 10);
    if (isNaN(reminderDays)) {
      console.error("Invalid reminder value");
      return;
    }

    selectedDate.setDate(selectedDate.getDate() + reminderDays);

    const groomerData = {
     
        calendar: date,
        groomer: groomer,
        next_visit: selectedDate
  
    };

    try {
      if (pet?.id) {
        await axios.post(`${API_URL}pets/${pet.id}/groomers`, groomerData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDate('');
        setReminder('');
        setGroomer('');
        setNextVisit('');
        setFlagGroom(true);
        setRefresh(prev => !prev);
      } 
    } catch (error) {
      alert("Error saving entry");
    }
  }, [date, groomer, nextVisit, reminder, pet, token, setFlagGroom]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (pet?.id) {
          const response = await axios.get(`${API_URL}pets/${pet.id}/groomers`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDateHistory(response.data.map((groomer) => ({ 
            id: groomer.id,
            date: groomer.calendar,
            groomer: groomer.groomer,
            nextVisit: groomer.next_visit,
          })));
        }
      } catch (error) {
        alert('Error fetching history');
      }
    };
  
    fetchHistory();
  }, [refresh, pet, token]);

  const deleteEntry = async (id) => {
    try {
      if (pet?.id) {
        await axios.delete(`${API_URL}pets/${pet.id}/groomers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Entry deleted successfully!');
        setRefresh(prev => !prev);
      } else {
        alert('Pet data is missing.');
      }
    } catch (error) {
      console.error('Error deleting entry');
      alert('Error deleting entry');
    }
  };
  

  return (
    <div>
      <form className="flex gap-x-6 items-end" onSubmit={saveAction}>
        <div>
          <p className="block text-white text-slate-900 text-sm font-bold mb-2">Date</p>
          <div className="mb-4 w-36">
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-lg text-slate-900"
            />
          </div>
        </div>

        <div>
          <p className="block text-white text-slate-900 text-sm font-bold mb-2">Groomer</p>
          <div className="mb-4 w-40">
            <input
              id="groomer"
              type="text"
              value={groomer}
              onChange={(e) => setGroomer(e.target.value)}
              className="w-full p-2 border rounded-lg text-slate-900"
            />
          </div>
        </div>

        <button className="mb-4 px-4 text-white bg-pink-600 h-10 text-slate-900 content-center rounded-lg hover:bg-pink-700">
          Save
        </button>
      </form>

      <div className="flex items-center flex-col">
        <div className="flex gap-x-2">
          <div className="flex items-center gap-x-2 mb-4">
            <label className="block text-slate-900 text-sm font-bold mb-2 text-white">Next visit after:</label>
            <div className="flex items-center gap-x-2">
              <input
                id="reminder"
                type="number"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                className="w-16 h-6 p-2 border rounded-lg text-slate-900"
              />
              <span className="block text-slate-900 text-sm font-bold mb-2 text-white">days</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xl text-white font-semibold text-slate-900 mb-4">History</p>
    
      {dateHistory.map((entry, index) => (
        <div key={entry.id} className='flex justify-around'>
          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4'>
            <p>Date</p>
            <p className='block text-white text-slate-900 text-sm font-bold mb-2 mb-4'>{formatDate(entry.date)}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4'>
            <p>Groomer</p>
            <p className='mb-4 block text-white text-slate-900 text-sm font-bold mb-2'>{entry.groomer}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4'>
            <p>Next Visit</p>
            <p className='block text-white text-slate-900 text-sm font-bold mb-2 mb-4'>{formatDate(entry.nextVisit)}</p>
          </div>

          <button onClick ={()=> {deleteEntry(entry.id)}}>
            <FontAwesomeIcon icon={faTrash} className="text-white cursor-pointer" />
          </button>

        </div>
      ))}

    </div>
  
  );
}

export default GroomerDisplay;
