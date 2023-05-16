import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
    runtime: 'edge',
};

export default async function handler(req: NextRequest) {
    const zipCode = await (req as any).url.split('=').slice(-1)[0];
    try {
        const res = await fetch(
            `http://api.weatherapi.com/v1/current.json?q=${zipCode}&key=${
                process.env.WEATHER_API_KEY as string
            }`,
            { method: 'GET' }
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
