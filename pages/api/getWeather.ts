import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { zipCode } = req.body;
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: zipCode },
    headers: {
      'X-RapidAPI-Key': `${process.env.WEATHER_API_KEY}`,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return res.json(response.data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: JSON.stringify(e.message) });
  }
}
