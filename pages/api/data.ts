import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req_: NextRequest) {
  try {
    const res = await fetch('https://api.interzoid.com/getweatherzipcode?zip=30310', {method: 'GET', headers: {'content-type': 'application/json','x-api-key': process.env.WEATHER_API_KEY as string }}).then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(data => {console.log('see data', data); return data})
    return NextResponse.json({ res });
  } catch (e) {
    console.log(e)
  }

  return NextResponse.error();
};


