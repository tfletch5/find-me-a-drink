'use client';
import React, { FormEvent, useCallback, useState } from 'react';

import { Container, Typography } from '@material-ui/core';
import useStyles from '@/hooks/useStyles';
import GetDrinkForm from '@/components/GetDrinkForm';
import OurCircularProgress from '@/components/CircularProgress/CircularProgress';

export default function Home() {
    const classes = useStyles();
    const [zipCode, setZipCode] = useState('');
    const [weatherData, setWeatherData] = useState();
    const [suggestions, setSuggestions] = useState<string | null | undefined>();
    const [fetchingData, setFetchingData] = useState<boolean>(false);

    const handleClick = useCallback(
        (e: FormEvent<HTMLFormElement> | KeyboardEvent) => {
            e.preventDefault();
            if (!zipCode) {
                alert('Please enter a zip code!');
                return;
            }
            setFetchingData(true);
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
                            setFetchingData(false); //TODO: remove this when you start to make other api calls.
                        });
                })
                .catch((e) => {
                    console.log(e);
                    setFetchingData(false)
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
            <OurCircularProgress showProgress={fetchingData}/>
        </div>
    );
}
