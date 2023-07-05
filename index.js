const PORT = 8000;
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

app.get('/results', async (req, res) => {
    const passedLevel = req.query.level;
    
    const options = {
        method: 'GET',
        url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com'
        },
        params: {
            level: passedLevel,
            area: 'sat'
        }
      };
    
      try {
        const response = await axios.request(options);
        res.json(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error); 
      }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))