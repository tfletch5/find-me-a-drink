import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
    runtime: 'edge',
};

export default async function handler(req: NextRequest) {
    const phrase = await (req as any).url.split('=').slice(-1)[0];
    try {
        const body = {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: decodeURIComponent(phrase) }],
        };
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
            },
        })
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
