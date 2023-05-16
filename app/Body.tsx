"use client";
import { useEffect } from 'react'

export default function Body() {
    useEffect(() => {

        fetch('/api/data')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {console.log('see my data', data); return data})
            .catch(e => {
                console.log('THIS IS A ERROR')
            })
    }, [])

    return (
        <div>
            damn
        </div>
    )
}