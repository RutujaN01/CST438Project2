import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, AppBar, Button, Toolbar, TextField, Typography, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistId, setWishlistId] = useState();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const categories = ['Phones', 'Tablets', 'Laptops', 'TV', 'Gadgets'];

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate('/login');
    }

    // Fetch the "liked" wishlist
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/wishlists/`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.data) {
          setWishlist(response.data.data[0].items);
          setWishlistId(response.data.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    }

    fetchWishlist();
  }, [searchResults])
  const handleSearch = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate('/login');
      return;
    }

    setLoading(true);
    setSnackbarOpen(false);

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/items/searchName/${searchTerm}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

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

  const handleCategorySearch = async (category) => {
    const token = localStorage.getItem('access');
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate('/login');
      return;
    }

    setLoading(true);
    setSnackbarOpen(false);

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/items/searchCat/item`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        params: { category }
      });

      if (response.data.length > 0) {
        setSearchResults(response.data);
        setSnackbarMessage(`Items in category: ${category}`);
        setSnackbarSeverity('success');
      } else {
        setSearchResults([]);
        setSnackbarMessage(`No items found in category: ${category}`);
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSnackbarMessage('Failed to fetch items by category');
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

  const handleAddToWishlist = async (itemId) => {
    console.log(wishlistId)
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/wishlists/add-item`, {
      "wishlist_id": wishlistId,
      "item_id": itemId
    },
      { headers: { "Authorization": `Bearer ${localStorage.getItem('access')}` } })
    console.dir(response)
    if (response.status !== 200) {
      setSnackbarMessage('Failed to add item to wishlist');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  const toggleWishlist = async (itemId) => {
    // Handle adding/removing items from the wishlist in the backend
    await handleAddToWishlist(itemId);
    if (wishlist.includes(itemId)) {
      setWishlist(wishlist.filter(id => id !== itemId));
      localStorage.setItem("wishlistItems", JSON.stringify(wishlist.filter(id => id !== itemId)));
    } else {
      setWishlist([...wishlist, itemId]);
      localStorage.setItem("wishlistItems", JSON.stringify([...wishlist, itemId]));
    }
  };

  return (
    <Box>
      {/* Header Bar */}
      <Box sx={{mb: 15}}>
      <AppBar position="fixed" sx={{ backgroundColor: '#2C2C42', height: '60px', display: 'flex', justifyContent: 'space-between' }}>
        <Toolbar sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '140px', height: 'auto', marginRight: '10px', marginLeft: '-30px' }} />
          </Box>

          <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center', flexGrow: 1, fontWeight: 'bold', fontSize: '24px', marginLeft: '-100px' }}>
            Search
          </Typography>
        </Toolbar>
      </AppBar>
      </Box>
      {/* Main Search Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', marginTop: '10px', padding: '20px' }}>
        {/* Search Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '500px', marginBottom: '30px' }}>
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
            sx={{ backgroundColor: '#2C2C42', marginLeft: '-50px', marginRight: '50px', color: '#fff', borderRadius: '50%', padding: '10px', '&:hover': { backgroundColor: '#3B3B51' } }}
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
          {loading && <CircularProgress />}
        </Box>

        {/* Categories */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            // position: 'fixed',
            // top: '280px',
            marginBottom: '10px',
            zIndex: 0,
          }}
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              onClick={() => handleCategorySearch(category)}
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

        {/* Scrollable Search Results */}
        <Box sx={{ width: '100%', maxWidth: '600px', height: '400px', overflowY: 'auto' }}>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <Box key={item.id} sx={{ padding: '20px', marginBottom: '10px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', position: 'relative' }}>
                <Typography variant="h7" fontWeight='bold'>{item.name}</Typography>
                <Typography>Description: {item.description}</Typography>
                <Typography>Price: ${item.price}</Typography>
                
                {/* Heart Icon with Toggle Wishlist */}
                <IconButton
                  onClick={() => toggleWishlist(item.id)}
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    borderRadius: '50%',
                    padding: '5px',
                  }}
                >
                  {/* Check if item is in wishlist, each element is an object with an id attribute */}
                  {wishlist.map((currentItem) => currentItem.id).includes(item.id) ? (
                    <FavoriteIcon sx={{ color: 'red' }} />  // Filled red heart
                  ) : (
                    <FavoriteBorderIcon sx={{ color: 'black' }} />  // Black outlined heart
                  )}
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography>No results found.</Typography>
          )}
        </Box>
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