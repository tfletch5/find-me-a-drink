import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const options = {
    method: "GET",
    url: "https://the-cocktail-db.p.rapidapi.com/search.php",
    params: { s: "tequila" },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };

  try {
    const {data} = await axios.request(options);
    const results = {
      count: data.drinks.length,
      drinks: data.drinks,
    };
    
    res.status(200).json(results);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
