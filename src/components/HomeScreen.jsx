import React from "react";
import '../styles/HomeScreen.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { faFrog } from '@fortawesome/free-solid-svg-icons';
import { faCat } from '@fortawesome/free-solid-svg-icons';

function HomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-pink-200 to-pink-300">
    <div className="grid grid-cols-3">
        <div id="siteName" className=" col-start-2 text-center text-4xl text-slate-100 py-10">
          Pet Tracker
        </div>

        <button className="col-start-3 justify-self-center self-start py-2 px-5 my-10 text-1xl text-slate-100 border-solid border-2 border-pink-500 bg-pink-500 hover:bg-pink-400 hover: border-pink-400 rounded-full">
          + add pet
        </button>
    </div>

      <div id = "picker" className="flex justify-around text-3xl text-slate-100 mt-3">
        <p>Pets</p>
        <p>Expense</p>
      </div>
    </div>
  )
}

export default HomeScreen;
