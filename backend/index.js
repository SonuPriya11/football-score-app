const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

const apiKey = 'f85ae8acac07446fa0910a24ad0ace66';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/football-data/teams', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/teams?limit=500', {
      headers: {
        'X-Auth-Token': apiKey
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.get(`/api/football-data/:id`, async (req, res) => {
  const {id} = req.params;
  try {
    const response = await axios.get(`https://api.football-data.org/v4/competitions/${id}/standings`, {
      headers: {
        'X-Auth-Token': apiKey
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
})

app.get('/api/football-data/', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/competitions', {
      headers: {
        'X-Auth-Token': apiKey
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching football teams:', error.response.data);
    res.status(500).json({ error: 'An error occurred while fetching football teams.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
