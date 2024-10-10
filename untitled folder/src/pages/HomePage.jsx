import React from 'react';
import { Box, AppBar, Toolbar, InputBase, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Add this import for navigation
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/images/logo.png'; 
import sampleImage1 from '../assets/phones.webp'; 
import sampleImage2 from '../assets/Tablets.jpeg'; 
import sampleImage3 from '../assets/TV.jpeg'; 
import sampleImage4 from '../assets/Gadgets.jpeg'; 

const HomePage = () => {
  const boxesContent = [
    { image: sampleImage1, name: 'PHONES' },
    { image: sampleImage2, name: 'TABLETS' },
    { image: sampleImage3, name: 'TV' },
    { image: sampleImage4, name: 'GADGETS' },
  ];

  const navigate = useNavigate(); 

  const handleLoginNavigation = () => {
    console.log("Navigating to login page");
    navigate('/login');
};

  return (
    <Box>
      {/* Header Bar */}
      <AppBar
        position="fixed" 
        sx={{
          display: 'flex', 
          backgroundColor: '#2c2c42', 
          padding: '5px', 
          alignItems: 'center', 
          width: '100%', 
          height: '60px', 
          top: 0, 
          left: 0, 
          zIndex: 1000, 
          justifyContent: 'space-between',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
          {/* Logo on the left side */}
          <img 
            src={logo} 
            alt="TechMart Logo" 
            style={{ width: '140px', height: 'auto', marginRight: '10px' }} 
          />

          {/* Search Bar and Buttons Container */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Search Bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: '6px',
                padding: '0 8px',
                width: '400px', 
                marginRight: '16px',
              }}
            >
              <InputBase 
                placeholder="Search..." 
                sx={{ flex: 1, padding: '4px' }} 
              />
              <Button sx={{ padding: '0' }}>
                <SearchIcon />
              </Button>
            </Box>

            {/* Login and Admin Buttons */}
            <Button onClick={handleLoginNavigation}

              sx={{ 
                marginRight: '8px', 
                backgroundColor: 'transparent', 
                border: 'none', 
                color: '#f1c40f', 
                padding: '0', 
                '&:hover': {
                  backgroundColor: 'transparent', 
                },
              }}
            >
              Login
            </Button>
            <Button 
              sx={{ 
                backgroundColor: 'transparent', 
                border: 'none', 
                color: '#f1c40f', 
                padding: '0', 
                '&:hover': {
                  backgroundColor: 'transparent', 
                },
              }}
            >
              Admin
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%', 
          top: '103px',
          transform: 'translateX(-50%)', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Standing Rectangle Boxes */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between', 
            width: '90%', 
            marginTop: '80px',
          }}
        >
          {boxesContent.map((item, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: '#2c2c42',
                width: '400px', 
                height: '400px', 
                borderRadius: '25px', 
                margin: '0 30px', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ 
                  width: '300px', 
                  height: '200px', 
                  borderRadius: '8px', 
                }} 
              />
              {/* Name Below the Image as Button */}
              <Button 
                variant="text" 
                sx={{ 
                  color: '#f1c40f', 
                  marginTop: '10px', 
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent', 
                  },
                }}
              >
                {item.name}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
