import React, { useState } from 'react';

function GroomerDisplay() {
  const [reminder, setReminder] = useState('');
  const [date, setDate] = useState('');
  const [groomer, setGroomer] = useState('');
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState('');
  // const [nextVisit, setNextVisit] = useState('');

  const [dateHistory, setDateHistory] =useState([]);
  const [groomerHistory, setgroomerHistory] =useState([]);
  const [notesHistory, setNotesHistory] =useState([]);
  const [nextVisitHistory, setVisitHistory]= useState([]);

  // function nextVisit() {
  //   // Get the latest date from the dateHistory array
  //   let lastDate = dateHistory[dateHistory.length - 1];
  
  //   // If there's no date yet, return early or set a default date
  //   if (!lastDate) {
  //     console.log("No previous date found.");
  //     return;
  //   }
  
  //   // Convert the last saved date string to a Date object
  //   let selectedDate = new Date(lastDate);
  
  //   // Add the reminder days to the selected date
  //   selectedDate.setDate(selectedDate.getDate() + parseInt(reminder));
  
  //   // Format the new date
  //   const formattedDate = selectedDate.toLocaleDateString('en-US', {
  //     month: '2-digit',
  //     day: '2-digit',
  //     year: '2-digit',
  //   });
  
  //   // Update the result state with the formatted date
  //   setResult(formattedDate);
  // }
  

  function saveAction(e){
    e.preventDefault();

    // Get the latest date from the dateHistory array
    let lastDate = dateHistory[dateHistory.length - 1];
  
    // If there's no date yet, return early or set a default date
    if (!lastDate) {
      console.log("No previous date found.");
      return;
    }
  
    // Convert the last saved date string to a Date object
    let selectedDate = new Date(lastDate);
  
    // Add the reminder days to the selected date
    selectedDate.setDate(selectedDate.getDate() + parseInt(reminder));
  
    // Format the new date
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });
  
    // Update the result state with the formatted date
    setResult(formattedDate);


    setDateHistory([...dateHistory,date]);
    setgroomerHistory([...groomerHistory, groomer]);
    setNotesHistory([...notesHistory, notes]);
    setVisitHistory([...nextVisitHistory, result]);

    setDate('');
    setGroomer('');
    setNotes('');
  };

  return (
    <div className="">
      <div className='flex gap-x-6 items-end'>
        {/* DATE */}
        <div>
          <p className="block text-white text-slate-900 text-sm font-bold mb-2">Date</p>
          <form className="mb-4 w-36">
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-lg text-slate-900"
          />
          </form>
        </div>
        
        {/* GROOMER */}
        <div>
          <p className="block text-white text-slate-900 text-sm font-bold mb-2">Groomer</p>
          <form className="mb-4 w-40">
          <input
            id="groomer"
            type="text"
            value={groomer}
            onChange={(e) => setGroomer(e.target.value)}
            className="w-full p-2 border rounded-lg text-slate-900"
          />
          </form>
        </div>
        
        
        {/* NOTES */}
        <div>
          <p className="block text-slate-900 text-white text-sm font-bold mb-2">Notes</p>
          <form className="mb-4 w-52">
          <input
            id="notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded-lg text-slate-900"
          />
          </form>
        </div>

        {/* NEXT VISIT
        <div>
          <p className="block text-white text-slate-900 text-sm font-bold mb-2">Next Visit</p>
          <form className="mb-4 w-36">
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-lg text-slate-900"
          />
          </form>
        </div> */}

       
          <button
            className="mb-4 px-4 text-white bg-pink-600 h-10 text-slate-900 content-center rounded-lg hover:bg-pink-700"
            onClick={saveAction}
          >
            Save
        </button>
      </div>

      <div className='flex items-center flex-col'>
        <div className='flex gap-x-2'>


          <form className="flex items-center gap-x-2 mb-4">
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
          </form>

          {/* <button
            onClick={saveAction}
            className="mb-4 px-4 text-white bg-pink-600 h-6 text-slate-900 content-center rounded-lg hover:bg-pink-700"
          >
            Enter
          </button> */}
        </div>
      </div>




      <p className="text-xl text-white font-semibold text-slate-900 mb-4">History</p>
      {dateHistory.map((_, index) => (
        <div key={index} className='flex'>
          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-44'>
            <p className=''>Date</p>
            <p className='block text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-44'>{dateHistory[index]}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-40'>
            <p className=''>Groomer</p>
            <p className='mb-4 w-40 block text-white text-slate-900 text-sm font-bold mb-2'>{groomerHistory[index]}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-52'>
            <p className=''>Notes</p>
            <p className='mb-4 w-52 block text-slate-900 text-white text-sm font-bold mb-2'>{notesHistory[index]}</p>
          </div>

          <div className='flex-col text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-44'>
            <p className=''>Next Visit</p>
            <p className='block text-white text-slate-900 text-sm font-bold mb-2 mb-4 w-44'>{nextVisitHistory[index]}</p>
          </div>


        </div>
      ))}
    </div>
  );
}

export default GroomerDisplay;
