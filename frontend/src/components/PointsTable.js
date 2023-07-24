import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PointsTable.css';

function PointsTable() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/football-data/${id}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  let arr = [];

  if (data !== null) {
    if (data.standings[0].stage === 'REGULAR_SEASON') {
      arr = Object.values(data.standings[0]);
    } else {
      arr = Object.values(data.standings);
    }
  }

  return (
    <div style={{ marginTop: '3.5rem' }}>
      {data ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black', height: '4.3rem', backgroundColor: 'gray', color: 'white' }}>
            <h1>{data.competition.name}</h1>
            <img src={data.competition.emblem} style={{ width: '3rem', margin: '1rem' }} atl={data.competition.name} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black', height: '2.5rem', backgroundColor: 'gray', color: 'white' }}>
            <h6>{data.area.name}</h6>
            <img src={data.area.flag} style={{ width: '3rem', margin: '1rem' }} alt={data.area.name} />
          </div>
          {arr.length === 4 ? (
            <table className='table'>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Team</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Lost</th>
                  <th>Draw</th>
                  <th>Points</th>
                  <th>GD</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>Form</th>
                </tr>
              </thead>
              <tbody>
                {arr[3] ? (
                  arr[3].map((ele) => (
                    <tr key={ele.team.id}>
                      <td>{ele.position}</td>
                      <td>
                        {ele.team.name}
                        <img src={ele.team.crest} style={{ width: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} atl={ele.team.name} />
                      </td>
                      <td>{ele.playedGames}</td>
                      <td>{ele.won}</td>
                      <td>{ele.lost}</td>
                      <td>{ele.draw}</td>
                      <td>{ele.points}</td>
                      <td>{ele.goalDifference}</td>
                      <td>{ele.goalsFor}</td>
                      <td>{ele.goalsAgainst}</td>
                      <td>{ele.form}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">Loading</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            arr.map((groupInfo) => (
              <div>
                <h1 style={{backgroundColor:"gray", color:"white"}}>{groupInfo.group}</h1>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>Team</th>
                      <th>Played</th>
                      <th>Won</th>
                      <th>Lost</th>
                      <th>Draw</th>
                      <th>Points</th>
                      <th>GD</th>
                      <th>GF</th>
                      <th>GA</th>
                    </tr>
                  </thead>
                  <tbody>
                      {groupInfo.table.map((ele) => (
                        <tr key={ele.team.id}>
                          <td>{ele.position}</td>
                          <td>
                            {ele.team.name}
                            <img src={ele.team.crest} style={{ width: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} atl={ele.team.name} />
                          </td>
                          <td>{ele.playedGames}</td>
                          <td>{ele.won}</td>
                          <td>{ele.lost}</td>
                          <td>{ele.draw}</td>
                          <td>{ele.points}</td>
                          <td>{ele.goalDifference}</td>
                          <td>{ele.goalsFor}</td>
                          <td>{ele.goalsAgainst}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default PointsTable;
