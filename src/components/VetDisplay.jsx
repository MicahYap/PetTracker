import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function VetDisplay({ pet, setFlagVet }) {
  const [reminder, setReminder] = useState('');
  const [date, setDate] = useState('');
  const [vet, setVet] = useState('');
  const [nextVisit, setNextVisit] = useState('');
  const [dateHistory, setDateHistory] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [concern, setConcern] = useState('');

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

    if (!date || !vet || !concern) {
      alert('Please fill in Date, Vet, and Concern fields.');
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

    const vetData = {
        calendar: date,
        vet: vet,
        concern: concern,
        next_visit: selectedDate.toISOString().split('T')[0]
    };

    try {
      if (pet?.id) {
        await axios.post(`h${API_URL}pets/${pet.id}/vets`, vetData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDate('');
        setReminder('');
        setVet('');
        setNextVisit('');
        setConcern('');
        setFlagVet(true);
        setRefresh(prev => !prev);
      }
    } catch (error) {
      alert("Error saving entry");
    }
  }, [date, vet, nextVisit, reminder, pet, token, setFlagVet, concern]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (pet?.id) {
          const response = await axios.get(`${API_URL}pets/${pet.id}/vets`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Vet history response:', response.data); // Log API response
          setDateHistory(response.data.map((vet) => ({
            id: vet.id,
            date: vet.calendar,
            vet: vet.vet,
            concern: vet.concern,
            nextVisit: vet.next_visit,
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
        await axios.delete(`${API_URL}pets/${pet.id}/vets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRefresh(prev => !prev);
      } else {
        alert('Pet data is missing.');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
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
          <p className="block text-white text-slate-900 text-sm font-bold mb-2">Vet</p>
          <div className="mb-4 w-40">
            <input
              id="vet"
              type="text"
              value={vet}
              onChange={(e) => setVet(e.target.value)}
              className="w-full p-2 border rounded-lg text-slate-900"
            />
          </div>
        </div>

        <div>
          <p className="block text-white text-slate-900 text-sm font-bold mb-2">Concern</p>
          <div className="mb-4 w-40">
            <input
              id="concern"
              type="text"
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              className="w-full p-2 border rounded-lg text-slate-900"
            />
          </div>
        </div>

        <button type="submit" className="mb-4 px-4 text-white bg-pink-600 h-10 text-slate-900 content-center rounded-lg hover:bg-pink-700">
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

      {dateHistory.map((entry) => (
        <div key={entry.id} className='flex justify-around'>
          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2'>
            <p>Date</p>
            <p className='block text-white text-slate-900 text-sm font-bold mb-2'>{formatDate(entry.date)}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2'>
            <p>Vet</p>
            <p className='block text-white text-slate-900 text-sm font-bold mb-2'>{entry.vet || 'N/A'}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2'>
            <p>Concern</p>
            <p className='block text-white text-slate-900 text-sm font-bold mb-2'>{entry.concern || 'N/A'}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2'>
            <p>Next Visit</p>
            <p className='block text-white text-slate-900 text-sm font-bold mb-2'>{formatDate(entry.nextVisit)}</p>
          </div>

          <button
            onClick={() => deleteEntry(entry.id)}
            className='text-white cursor-pointer'
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default VetDisplay;
