import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { phrase } = req.body;

  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": "You are the best bartender."}, {role: "user", content: phrase}],
    });
    return res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: JSON.stringify(e.message) });
  }
}
