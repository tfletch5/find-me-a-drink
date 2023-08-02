"use client";
import axios from 'axios';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

const ZipCodeForm = ({ setWeather }) => {
  const classes = useStyles();
  const [zipCode, setZipCode] = useState('');

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (!zipCode) {
      alert('Please enter a zip code!');
      return;
    }

    // Get weather data by zip code
    const { data } = await axios.post('/api/getWeather', { zipCode });
    setWeather(data);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Find Me a Drink!
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Enter your zip code to find a drink that fits your local time and
        weather!
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
  );
};

export default ZipCodeForm;
