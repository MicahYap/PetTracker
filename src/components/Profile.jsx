import React, { useEffect, useState, useCallback } from "react";
import GroomerDisplay from "./GroomerDisplay";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VaxCardDisplay from "./VaxCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import VetDisplay from "./VetDisplay";

function Profile() {
  const [flagGroom, setFlagGroom] = useState(true);
  const [flagVet, setFlagVet] = useState(false);
  const [flagVax, setFlagVax] = useState(false);
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true)

  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadedPicUrl, setUploadedPicUrl] = useState(null);
  const userId = localStorage.getItem('userId');


  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`${API_URL}pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPet(response.data);
        setUploadedPicUrl(response.data.profile_picture_url);
        
      
        localStorage.setItem('petId', response.data.id);
      } catch (error) {
        alert("Error fetching pet details");
      }
    };
  
    fetchPet();
  }, [id, token]);

  const handleImageChange = useCallback((e) => {
    if (e.target.files.length > 0) {
      setProfilePicture(e.target.files[0]);
    }
  }, []);

  const uploadImg = useCallback(
    async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("profile_picture", profilePicture);
      formData.append("pet_id", id);

      try {
        const response = await axios.post(
          `${API_URL}pets/${pet.id}/profile_picture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUploadedPicUrl(response.data.profile_picture_url);
      } catch (error) {
        alert("Upload error");
      }
    },
    [profilePicture, id, pet, token]
  );

  const deletePet = async() => {
    try {
      const response = await axios.delete (`${API_URL}pets/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setRefresh(prev => !prev);
      navigate(`/homepage/${userId}`)
    } catch (error) {
      alert ('Error deleting pet')
    }
  }

  const formattedDate = (e) => {
    if (!e) return '';
    const [year, month, day] = e.split('-');
    return `${month}/${day}/${year.slice(-2)}`;
  }


  return (
    <div className="min-h-screen bg-gradient-to-t from-pink-200 to-pink-300">
      <div className="flex space-x-6 p-10">
        {/* left side of the scree */}
        <div className="w-1/3 space-y-6">
          <p className="bg-pink-500 p-4 rounded-lg text-center text-white text-xl font-bold border-none focus:outline-none w-full">
            {pet ? pet.name : "Loading..."}
          </p>

          {uploadedPicUrl && <img src={uploadedPicUrl} alt="Profile" className="h-h-2/4"/>}

          <div>
            <div className="bg-pink-200 rounded-lg">
              <input
                id="profile_picture"
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border rounded-lg text-slate-900"
              />

              <button
                onClick={uploadImg}
                className="bg-pink-500 text-white rounded-lg"
              >
                Upload Image
              </button>
            </div>
          </div>

          <div className="bg-pink-200 h-32 rounded-lg p-4 text-center">
            <p>{pet ? `Breed: ${pet.breed}` : "Loading..."}</p>
            <p>{pet ? `Birthday: ${formattedDate(pet.birthday)}` : "Loading..."}</p>
            <p>{pet ? `Gotcha Day: ${formattedDate(pet.gotcha_day)}` : "Loading..."}</p>
            <p>{pet ? `Gender: ${pet.gender}` : "Loading..."}</p>
          </div>

          <div className="flex justify-between">
            <button
              className="text-pink-800 underline"
              onClick={(userId) => navigate(`/pets/${userId}/edit_profile`)}
            >
              Edit Profile
            </button>

            <button
              className="text-pink-800 underline"
              onClick={(userId) => navigate(`/homepage/${userId}`)}
            >
              ← BACK TO DASHBOARD
            </button>
          </div>

          <button 
            onClick={() => {deletePet(id)}}
          > 
            <FontAwesomeIcon icon={faTrash} className="text-pink-500 cursor-pointer" /> 
            Delete Pet
          </button>

        </div>

        {/* //next column */}
        <div className="w-2/3 bg-pink-200 p-8 rounded-lg">
          <div className="flex w-full">
            <p
              className={`px-6 py-2 rounded-t-lg cursor-pointer ${
                flagGroom
                  ? "bg-pink-400 text-slate-900"
                  : "bg-pink-300 text-slate-900 hover:bg-pink-300"
              }`}
              onClick={() => {
                setFlagGroom(true);
                setFlagVet(false);
                setFlagVax(false);
              }}
            >
              Grooming
            </p>
            <p
              className={`px-6 py-2 rounded-t-lg cursor-pointer ${
                flagVet
                  ? "bg-pink-400 text-slate-900"
                  : "bg-pink-300 text-slate-900 hover:bg-pink-300"
              }`}
              onClick={() => {
                setFlagGroom(false);
                setFlagVet(true);
                setFlagVax(false);
              }}
            >
              Vet
            </p>
            <p
              className={`px-6 py-2 rounded-t-lg cursor-pointer ${
                flagVax
                  ? "bg-pink-400 text-slate-900"
                  : "bg-pink-300 text-slate-900 hover:bg-pink-300"
              }`}
              onClick={() => {
                setFlagGroom(false);
                setFlagVet(false);
                setFlagVax(true);
              }}
            >
              Vax Card
            </p>
          </div>

          <div className="bg-pink-400 w-full h-full p-6 overflow-y-auto">
            {flagGroom && <GroomerDisplay  pet={pet} setFlagGroom={setFlagGroom} />}
            {flagVax && <VaxCardDisplay pet={pet} setFlagVax={setFlagVax} />}
            {flagVet && <VetDisplay pet={pet} setFlagVet={setFlagVet} />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
