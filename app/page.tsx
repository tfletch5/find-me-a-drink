'use client';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url("/row-of-shots.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: theme.spacing(1),
    },
    textField: {
        marginBottom: theme.spacing(2),
        color: 'white',
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
    },
    footer: {
        position: 'absolute',
        left: '50%',
        bottom: theme.spacing(2),
    },
}));

export default function Home() {
    const classes = useStyles();
    const [zipCode, setZipCode] = useState('');
    const [weatherData, setWeatherData] = useState();
    const [suggestions, setSuggestions] = useState();

    const handleClick = (e: any) => {
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
                } fahrenheit?`;
                fetch(`/api/chat?phrase=${phrase}`)
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then((data) => {
                        console.log(
                            'SEE DATA ',
                            data.res.choices[0].message.content
                        );
						setSuggestions(data.res.choices[0].message.content);
                    });
            })
            .catch((e) => {
                console.log(e);
            });
    };

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
                <form
                    className={classes.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleClick(e);
                    }}
                >
                    <TextField
                        onKeyDown={(e) => {
                            if (e.code == '13') {
                                e.preventDefault();
                                handleClick(e);
                                return;
                            }
                        }}
                        className={classes.textField}
                        label="Zip Code"
                        variant="filled"
                        onChange={(e) => setZipCode(e.currentTarget.value)}
                        fullWidth
                    />
                    <Button
                        onKeyDown={(e) => {
                            e.preventDefault();
                            handleClick(e);
                        }}
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        Find me a Drink!
                    </Button>
                </form>
            </Container>
        </div>
    );
}
