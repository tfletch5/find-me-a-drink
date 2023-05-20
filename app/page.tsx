'use client';
import React, { FormEvent, useCallback, useState } from 'react';
import {Container, Typography} from '@mui/material';
import GetDrinkForm from '@/components/GetDrinkForm/GetDrinkForm';
import CircularProgress from '@/components/CircularProgress/CircularProgress';
import Alert from '@/components/Alert/Alert';
import styles from './page.module.css';

export default function Home() {
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
                            let choices: string | string[] = decodeURIComponent(
                                content
                            ).replaceAll(/\n/g, '');
                            choices = choices.split(regex);
                            setSuggestions(choices as unknown as string);
                            let choicesWithoutAiDisclaimer: string[] = [];
                            for (const c of choices) {
                                console.log('SEE c ', {c, choices})
                                const includesAi = c.includes('AI')
                                if (includesAi && c.includes('non-alcoholic'))  {
                                    break;
                                }
                                if (includesAi) {
                                    continue;
                                }
                                console.log(c)
                                choicesWithoutAiDisclaimer = [...choicesWithoutAiDisclaimer, c]

                            }
                            
                            setFetchingData(false); //TODO: remove this when you start to make other api calls.
                        });
                })
                .catch((e) => {
                    console.log(e);
                    setFetchingData(false);
                });
        },
        [zipCode]
    );

    return (
        <div className={styles.root}>
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
            <CircularProgress showProgress={fetchingData} />
            <Alert />
        </div>
    );
}
