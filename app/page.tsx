'use client';
import React, { FormEvent, useCallback, useState } from 'react';

import { Container, Typography } from '@material-ui/core';
import useStyles from '@/hooks/useStyles';
import GetDrinkForm from '@/components/GetDrinkForm';

export default function Home() {
    const classes = useStyles();
    const [zipCode, setZipCode] = useState('');
    const [weatherData, setWeatherData] = useState();
    const [suggestions, setSuggestions] = useState<string | null | undefined>();

    const handleClick = useCallback(
        (e: FormEvent<HTMLFormElement> | KeyboardEvent) => {
            e.preventDefault();
            if (!zipCode) {
                alert('Please enter a zip code!');
                return;
            }
            fetch(`/api/getWeather?zipCode=${zipCode}`)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then((data) => {
                    setWeatherData(data.res.current);
                    return data.res.current;
                })
                .then((weatherData) => {
                    const phrase = `List alcholic beverages that would best match the weather if is ${(
                        weatherData.condition.text as string
                    ).toLowerCase()} and the temperature is ${
                        weatherData.temp_f
                    } fahrenheit? Give me the suggestions in an ordered list.`;
                    fetch(`/api/chat?phrase=${phrase}`)
                        .then((res) => {
                            if (res.ok) {
                                return res.json();
                            }
                        })
                        .then((data) => {
                            const regex = /\b\d+\./g;
                            const { content } = data.res.choices[0].message;
                            let matches: string | string[] = decodeURIComponent(
                                content
                            ).replaceAll('\\n', '');
                            matches = matches.split(regex);
                            setSuggestions(matches as unknown as string);
                        });
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        [zipCode]
    );

    return (
        <div className={classes.root}>
            <Container maxWidth="xs">
                <Typography variant="h4" align="center" gutterBottom>
                    Find Me a Drink!
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    Enter your zip code to find a drink that fits your local
                    time and weather!
                </Typography>
                <GetDrinkForm
                    handleClick={handleClick}
                    setZipCode={setZipCode}
                />
            </Container>
        </div>
    );
}
