'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import ZipCodeForm from './components/ZipCodeForm';
import LocalWeather from './components/LocalWeather';
import DrinkSuggestions from './components/DrinkSuggestions';

const Loading = () => {
  <Box sx={{ display: 'flex', width: 100, height: 100 }}>
    <CircularProgress />
  </Box>;
};

export default function Home() {
  const [weather, setWeather] = useState();
  const [suggestions, setSuggestions] = useState();

  // Get drink suggestions based on weather data
  const getSuggestions = async () => {
    const phrase = `Give me a list of the best alcohilic beverages to drink in ${weather.location.name}, ${weather.location.region} around ${weather.location.localtime} if the weather is ${weather.current.condition.text} and the temperature is ${weather.current.temp_f} fahrenheit? Please give me an answer, description, and instructions in html format with just the ol tag. And include the drink name, an online image of the drink, and description.`;
    const { data } = await axios.post('/api/chat', { phrase });
    8;
    setSuggestions(data.choices[0].message.content);
  };

  useEffect(() => {
    getSuggestions();
  }, [weather]);

  return (
    <Stack>
      <ZipCodeForm setWeather={setWeather} />
      {weather ? <LocalWeather weather={weather} /> : <CircularProgress />}
      {suggestions ? <DrinkSuggestions suggestions={suggestions} /> : null}
    </Stack>
  );
}
