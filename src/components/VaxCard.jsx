import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VaxCardDisplay({ pet, setFlagVax }) {
  const [reminder, setReminder] = useState('');
  const [date, setDate] = useState('');
  const [vet, setVet] = useState('');
  const [vaccine, setVaccine] = useState('');
  const [nextVisit, setNextVisit] = useState('');
  const [cardImg, setCardImg] = useState(null);
  const [viewVaxCard, setViewVaxCard] = useState(null);
  const [uploadedCardImgUrl, setUploadedCardImgUrl] = useState(null);
  const [reminderHistory, setReminderHistory] = useState([]);
  const [dateHistory, setDateHistory] = useState([]);
  const [vetHistory, setVetHistory] = useState([]);
  const [vaccineHistory, setVaccineHistory] = useState([]);
  const [visitHistory, setVisitHistory] = useState([]);
  const [flag, setFlag] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem('token');
  const { id } = useParams();

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

    if (!date || !vet || !vaccine) {
      alert('Please fill in Date, Vet, and Vaccine fields.');
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

    const vaxData = {
      calendar: date,
      vet: vet,
      vaccine: vaccine,
      next_visit: selectedDate,
    };

    try {
      await axios.post(`http://localhost:3001/pets/${pet.id}/vaxs`, vaxData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Entry saved!');
      setDate('');
      setReminder('');
      setVet('');
      setVaccine('');
      setNextVisit('');
      setFlagVax(true);
      setRefresh(prev => !prev);
    } catch (error) {
      alert("Error saving entry: " + error.message);
    }
  }, [date, vet, vaccine, reminder, pet.id, token, setFlagVax]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/pets/${pet.id}/vaxs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDateHistory(response.data.map((vax) => vax.calendar));
        setVetHistory(response.data.map((vax) => vax.vet));
        setVaccineHistory(response.data.map((vax) => vax.vaccine));
        setVisitHistory(response.data.map((vax) => vax.next_visit));
      } catch (error) {
        alert('Error fetching history: ' + error.message);
      }
    };
  
    fetchHistory();
  }, [refresh, pet.id, token]);

  const handleImageChange = useCallback((e) => {
    if (e.target.files.length > 0) {
      setCardImg(e.target.files[0]);
    }
  }, []);

  const uploadImg = useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('vax_card', cardImg);
    formData.append('pet_id', pet.id);

    try {
      const response = await axios.post(`http://localhost:3001/pets/${pet.id}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setUploadedCardImgUrl(response.data.vax_card_url);
      setFlag(false);
      alert('File uploaded successfully!');
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    }
  }, [cardImg, pet.id, token]);

  const handleViewVaxCard = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/pets/${pet.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setViewVaxCard(response.data.vax_card_url);
      setFlag(true);
    } catch (error) {
      alert('Error fetching file: ' + error.message);
    }
  }, [pet.id, token]);

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
          <p className="block text-slate-900 text-white text-sm font-bold mb-2">Vaccine</p>
          <div className="mb-4 w-52">
            <input
              id="vaccine"
              type="text"
              value={vaccine}
              onChange={(e) => setVaccine(e.target.value)}
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

      <div>
        <p className="block text-slate-900 text-white text-sm font-bold mb-2">Vax Card</p>
        <div className="mb-4 w-52">
          <input
            id="cardImg"
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg text-slate-900"
          />
        </div>
      </div>

      <button onClick={uploadImg} className="bg-pink-500 text-white p-2 rounded-lg">
        Upload Vax Card
      </button>
            
      {!flag && (
        <button onClick={handleViewVaxCard} className="mt-2 bg-blue-500 text-white p-2 rounded-lg">
          See Vax Card
        </button>
      )}

      {flag && (
        <button onClick={() => setFlag(false)} className="mt-2 bg-red-500 text-white p-2 rounded-lg">
          Hide Vax Card
        </button>
      )}

      {flag && viewVaxCard && (
        <div className="mt-4">
          <img src={viewVaxCard} alt="Vaccine Card" className="w-52 h-auto"/>
        </div>
      )}

      <p className="text-xl text-white font-semibold text-slate-900 mb-4">History</p>
      {dateHistory.map((date, index) => (
        <div key={index} className='flex'>
          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-44'>
            <p>Date</p>
            <p className='block text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-44'>{formatDate(date)}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-40'>
            <p>Vet</p>
            <p className='mb-4 w-40 block text-white text-slate-900 text-sm font-bold mb-2'>{vetHistory[index]}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-52'>
            <p>Vaccine</p>
            <p className='mb-4 w-52 block text-slate-900 text-white text-sm font-bold mb-2'>{vaccineHistory[index]}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-44'>
            <p>Next Visit</p>
            <p className='block text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-44'>{formatDate(visitHistory[index])}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VaxCardDisplay;
