'use client';
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: 'url("/row-of-shots.jpeg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(2),
    color: "white",
    backgroundColor: "white",
    borderRadius: theme.spacing(1),
  },
  footer: {
    position: "absolute",
    left: '50%',
    bottom: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [zipCode, setZipCode] = useState("");

  const handleDrink = () => {
    if (!zipCode) {
      alert("Please enter a zip code!");
      return;
    }
    alert(`Found you a drink in ${zipCode}!`);
  };
  console.log(zipCode)

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Find Me a Drink!
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Enter your zip code to find a drink that fits your local time and weather!
        </Typography>
        <form className={classes.form}>
          <TextField
            className={classes.textField}
            label="Zip Code"
            variant="filled"
            onChange={(e) => setZipCode(e.currentTarget.value)}
            fullWidth
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleDrink}>
            Find me a Drink!
          </Button>
        </form>
      </Container>
    </div>
  );
}
