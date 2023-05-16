import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
    runtime: 'edge',
};

export default async function handler(req_: NextRequest) {
    const zip = 30310;
    try {
        const res = await fetch(
            `http://api.weatherapi.com/v1/current.json?q=${zip}&key=${
                process.env.WEATHER_API_KEY as string
            }`,
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': process.env.WEATHER_API_KEY as string,
                },
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => data);
        return NextResponse.json({ res });
    } catch (e) {
        console.log(e);
    }

    return NextResponse.error();
}
