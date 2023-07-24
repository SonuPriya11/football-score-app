import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tournament.css'
import TournamentFeatures from './TournamentFeatures';

const Tournament = () => {
  const [data, setData] = useState(null);
  const [countryFlags, setCountryFlags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/football-data');
        await setData(response.data);
      } catch (error) {
        console.error(error);
      }
      const flags = await fetch('https://rest-country-api.p.rapidapi.com/', {
        headers: {
          'X-RapidAPI-Key': '7ce1cad49emshf7d8d1624ed7065p189a99jsn9b74f4130865',
          'X-RapidAPI-Host': 'rest-country-api.p.rapidapi.com'
        }
      })
      await flags.json().then((d) => {
        const dummyArray = Object.values(d)
        setCountryFlags((prev) => dummyArray)
      })
    };
    fetchData();
  }, []);

  return (
    <div className='contains'>
      <h1 style={{marginBottom:"1rem"}}>Football Data</h1>
      {data ? (
          <TournamentFeatures tournaments={data.competitions} flags={countryFlags}/>
      ) : (
        <div className='loader'></div>
      )}
    </div>
  );
};

export default Tournament;
