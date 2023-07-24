import React, { useEffect, useState } from 'react'
import Fixtures from './Fixtures'
import axios from 'axios'

function Home() {
    const [matchDetails, setMatchDetails] = useState([])
    const [countryFlags, setCountryFlags] = useState([])
    const [teams, setTeams] = useState([])
    const [tour, setTour] = useState([])
    const [mode, setMode] = useState('Live')
    const [allMatches, setAllMatches] = useState([])

    const now = new Date();
    let date = now.getDate()+'/'
    let month = +now.getMonth();
    month = month+1;
    date +=month+'/';
    date+=now.getFullYear();

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getMatchdetails = async () => {
            try {
                setLoading(true)
                const data = await fetch(`https://footapi7.p.rapidapi.com/api/matches/live`, {
                    headers: {
                        'X-RapidAPI-Key': '67af75dcedmshd01f1cd5739874ep1f75f5jsn555ceac2e9cf',
                        'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
                    }
                })
                console.log(data)
                await data.json().then((d) => {
                    console.log(d)
                    const dummyArray = Object.values(d.events)
                    setMatchDetails((prev) => dummyArray)
                });

                const matches = await fetch(`https://footapi7.p.rapidapi.com/api/matches/${date}`, {
                    headers: {
                        'X-RapidAPI-Key': '67af75dcedmshd01f1cd5739874ep1f75f5jsn555ceac2e9cf',
                        'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
                    }
                })
                // console.log(matches)
                await matches.json().then((d) => {
                    // console.log(d)
                    const dummyArray = Object.values(d.events)
                    setAllMatches((prev) => dummyArray)
                });

                const res = await axios.get('http://localhost:3001/api/football-data');
                await setTour(res.data);
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

                const response = await axios.get('http://localhost:3001/api/football-data/teams');
                // console.log(response)
                await setTeams(response.data.teams);
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        getMatchdetails();
    }, [])

    const changeMode = (e)=>{
        setMode(e.target.value)
    }
    
    // console.log(teams)
    // console.log(matchDetails)
    // console.log(mode)

    return (
        <div style={{ marginTop: "5rem" }}>
            <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                <input type="button" onClick={changeMode} value="Live" style={{backgroundColor: "black", color: "white", border: "1px solid", borderColor: "black", borderRadius: "5px", padding: "5px", margin: "5px"}}/>
                <input type="button" onClick={changeMode} value="All Matches" style={{backgroundColor: "black", color: "white", border: "1px solid", borderColor: "black", borderRadius: "5px", padding: "5px", margin: "5px"}}/>
            </div>
            <Fixtures loading={loading} fixtures={matchDetails} flags={countryFlags} teams={teams} tour={tour} mode={mode} allMatches={allMatches} />
        </div>
    )
}

export default Home