import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


const LocalWeather = ({ weather }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '10px',
        border: '1px solid white',
        padding: '20px',
        width: '50%',
      }}
    >
      <Stack>
        <Typography variant='h6' component={"h2"}>{weather.current.condition.text}</Typography>
        <Stack direction="row" spacing={2}>
          <img
            src={`https:${weather.current.condition.icon}`}
            width={50}
            height={50}
            />
          <Typography pt={1} variant="h5" component="h2">
            {Math.ceil(weather.current.temp_f)} F
          </Typography>
        </Stack>
        <Typography>
          It's {moment(weather.location.localtime, "YYYY-mm-dd hh:mm").format("h:mm a")} in {weather.location.name}, {weather.location.region}
        </Typography>
      </Stack>
    </Box>
  );
};

export default LocalWeather;
