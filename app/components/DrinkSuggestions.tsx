"use client";
import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const MyBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '10px',
  border: '1px solid white',
  padding: '30px',
  color: 'black',
  '& li': {
    listStyleType: 'decimal',
    marginBottom: '10px',
  },
  width: '50%',
});

const DrinkSuggestions = ({ suggestions }) => {
  console.log("suggestions", suggestions);
  return <MyBox dangerouslySetInnerHTML={{ __html: suggestions }} />;
};

export default DrinkSuggestions;
