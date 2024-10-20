import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import logo from '../assets/images/logo.png';
import sampleImage1 from '../assets/phones.webp';
import sampleImage2 from '../assets/Tablets.jpeg';
import sampleImage3 from '../assets/TV.jpeg';
import sampleImage4 from '../assets/Gadgets.jpeg';
import bannerImage from '../assets/Homepage.png';

const HomePage = () => {
  const boxesContent = [
    { image: sampleImage1, name: 'phones' }, 
    { image: sampleImage2, name: 'tablets' }, 
    { image: sampleImage3, name: 'tv' }, 
    { image: sampleImage4, name: 'gadgets' }, 
  ];
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const accessToken = `Bearer ${localStorage.getItem("access")}`;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        console.log("No token found, redirecting to login");
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/get_current_user/`, {
          headers: {
            "Authorization": accessToken
          }
        });
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data', error);
        localStorage.removeItem('access');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate, accessToken]);

  const handleLoginNavigation = () => {
    navigate('/login');
  };

  const handleSignIn = () => {
    navigate('/signup');
  };

  const handleWishlistPage = () => {
    navigate('/wishlist');
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          display: 'flex',
          backgroundColor: '#2C2C42',
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
          <img
            src={logo}
            alt="TechMart Logo"
            style={{ width: '140px', height: 'auto', marginRight: '10px' }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={() => navigate('/search')}
              sx={{ color: '#FDFEFE', marginRight: '-20px' }}
            >
              <InputBase placeholder="Search..." sx={{ flex: 1, padding: '4px' }} />
              <Button sx={{ padding: '0' }}>
                <SearchIcon />
              </Button>
            </Box>
            <Button onClick={handleWishlistPage} sx={{ color: '#fdfefe', marginRight: '16px' }}>
              <FavoriteIcon />
            </Button>

            <Button
              onClick={handleLoginNavigation}
              sx={{
                marginRight: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fdfefe',
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
                color: '#fdfefe ',
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
      <Box
        sx={{
          position: 'relative',
          marginTop: '60px',
          width: '100%',
          height: '850px',
          overflow: 'hidden',
        }}
      >
        <img
          src={bannerImage}
          alt="Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '80px 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
            marginTop: '40px',
          }}
        >
          {boxesContent.map((item, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: '#2C2C42',
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
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '300px',
                  height: '200px',
                  borderRadius: '8px',
                }}
              />
              <Button
                variant="text"
                onClick={() => handleCategoryClick(item.name)}
                sx={{
                  color: '#FDFEFE ',
                  marginTop: '10px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {item.name.toUpperCase()} {/* Display in uppercase for the button */}
              </Button>
            </Box>
          ))}
        </Box>
        <Typography
          variant="h2"
          sx={{
            position: 'absolute',
            bottom: '25%',
            left: '45%',
            fontSize: '27px',
            transform: 'translateX(-50%)',
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          }}
        >
          Discover Your Next Gadget in TechMart
        </Typography>

        <Button
          onClick={handleSignIn}
          sx={{
            position: 'absolute',
            bottom: '17%',
            left: '45%',
            transform: 'translateX(-50%)',
            backgroundColor: '#797D7F ',
            color: '#fff',
            padding: '15px 20px',
            '&:hover': {
              backgroundColor: '#797D7F',
            },
          }}
        >
          Start Now
        </Button>
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: '#2C2C42',
          color: '#FDFEFE',
          padding: '20px 0',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">© 2024 TechMart. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;