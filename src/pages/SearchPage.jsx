import React, { useState } from 'react';
import axios from 'axios';
import { Box, AppBar,Button, Toolbar, TextField, Typography, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'; 
import logo from '../assets/images/logo.png';

const SearchPage = () => {

    
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const categories = ['Phones', 'Tablets', 'Laptops', 'TV', 'Gadgets'];

  const handleSearch = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
        console.log("No token found, redirecting to login");
        navigate('/login');
        return;
    }

    setLoading(true);
    setSnackbarOpen(false); 

    console.log("Searching for:", searchTerm);
    console.log("Access Token:", token);

    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/items/searchName/item`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            params: { name: searchTerm }  
        });

        console.log("Response data:", response.data); 
        if (response.data && response.data.name) {  
            setSearchResults([response.data]);  
            setSnackbarMessage('Search successful!');
            setSnackbarSeverity('success');
        } else {
            setSearchResults([]);
            setSnackbarMessage('Item not found.');
            setSnackbarSeverity('error');
        }

    } catch (error) {
        console.error('Error fetching search results:', error);
        setSnackbarMessage('Failed to fetch search results');
        setSnackbarSeverity('error');
        setSearchResults([]);
    } finally {
        setSnackbarOpen(true);
        setLoading(false);
    }
};

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      {/* Header Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#2C2C42', height: '60px', display: 'flex', justifyContent: 'space-between' }}>
        <Toolbar sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '140px', height: 'auto', marginRight: '10px', marginLeft:'-30px' }} />
          </Box>

          <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', flexGrow: 1, fontWeight:'bold', fontSize:'24px', marginLeft:'-100px' }}>
            Search
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Search Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', marginTop: '10px', padding: '20px' }}>
        {/* Search Bar */}
        <Box sx={{ position:'fixed',display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '500px', marginBottom: '10px', marginTop:'-400px' }}>
          <TextField
            fullWidth
            placeholder="Search for products..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ backgroundColor: '#fff', borderRadius: '25px', '& .MuiOutlinedInput-root': { '& fieldset': { borderRadius: '25px' } } }}
          />
          <IconButton
            type="submit"
            sx={{ backgroundColor: '#2C2C42', marginLeft: '-50px',marginRight:'50px', color: '#fff', borderRadius: '50%', padding: '10px', '&:hover': { backgroundColor: '#3B3B51' } }}
            onClick={handleSearch}
          >
            
            <SearchIcon />
            
          </IconButton>
          {/* Display Loading Spinner */}
        {loading && <CircularProgress />}
          
        </Box>

       

        {/* Categories */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            position:'fixed',
            marginTop:'-200px'
            
          }}
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              
              sx={{
    
                width: '150px',
                height: '60px',
                borderRadius: '20px',
                backgroundColor: '#2B2438',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#3B3B51',
                },
              }}
            >
              {category}
            </Button>
          ))}
        </Box>

        {/* Display Search Results */}
        {searchResults.length > 0 && (
          <Box sx={{ width: '100%', maxWidth: '600px', marginTop: '-150px' }}>
            {searchResults.map((item) => (
              <Box key={item.id} sx={{ padding: '20px', marginTop: '250px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography>Description: {item.description}</Typography>
                <Typography>Price: ${item.price}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchPage;