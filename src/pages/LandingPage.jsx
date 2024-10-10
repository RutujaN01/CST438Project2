import React, { useEffect, useCallback } from 'react';
import { Box } from '@mui/material'; 
import { useNavigate } from 'react-router-dom'; 
import logo from '../assets/images/logo.png'; 

const LandingPage = () => {
  const navigate = useNavigate(); 

  const handleAnimationEnd = useCallback(() => {
    navigate('/home'); 
  }, [navigate]); 

  useEffect(() => {
    const timeout = setTimeout(handleAnimationEnd, 3000); 
    return () => clearTimeout(timeout); 
  }, [handleAnimationEnd]); 

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100vh',
        background: '#2B2438',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img 
        src={logo} 
        alt="TechMart Logo" 
        style={{
          width: '1000px', 
          animation: 'zoomIn 3.5s ease forwards', 
        }} 
      />

      <style>
        {`
          @keyframes zoomIn {
            0% {
              transform: scale(0); 
              opacity: 0; 
            }
            50% {
              opacity: 1; 
              transform: scale(1.5); 
            }
            100% {
              transform: scale(1); 
              opacity: 1; 
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LandingPage;
