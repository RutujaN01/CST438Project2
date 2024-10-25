import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CategoryPage = () => {
  const { category } = useParams(); 
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [likedItems, setLikedItems] = useState(JSON.parse(localStorage.getItem('wishlist')) || {});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/items/`);
        setItems(response.data); 
      } catch (error) {
        console.error('Error fetching items: ', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (category) {
      const filtered = items.filter(item =>
        item.category && item.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [category, items]);

  const toggleLike = (item) => {
    setLikedItems((prevLikedItems) => {
      const updatedLikedItems = { ...prevLikedItems, [item.id]: !prevLikedItems[item.id] };

      localStorage.setItem('wishlist', JSON.stringify(updatedLikedItems));
      let wishlistArray = JSON.parse(localStorage.getItem('wishlistItems')) || [];
      if (!prevLikedItems[item.id]) {
        wishlistArray.push(item);
      } else {
        wishlistArray = wishlistArray.filter((i) => i.id !== item.id);
      }
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistArray));

      return updatedLikedItems;
    });
  };

  return (
    <Box sx={{ padding: '30px', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ 
          backgroundColor: '#25254a', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '8px', 
          marginBottom: '30px' 
        }}>
        Explore {category || 'Our Selection'}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Card 
                sx={{ 
                  width: '300px', 
                  boxShadow: 4, 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.url} 
                  alt={item.name}
                  sx={{ filter: 'brightness(0.9)' }}
                />
                <CardContent sx={{ padding: '16px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#25254a' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                    <strong>Description:</strong> {item.description}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: '8px', color: '#25254a' }}>
                    <strong>Price:</strong> {item.price}
                  </Typography>
                </CardContent>
                <IconButton
                  sx={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px',
                    color: likedItems[item.id] ? 'red' : '#25254a',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                    transition: 'color 0.3s ease',
                  }}
                  onClick={(e) => {
                    e.preventDefault(); 
                    toggleLike(item);
                  }}
                  aria-label="like"
                >
                  {likedItems[item.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Card>
            </a>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#25254a', fontStyle: 'italic' }}>
            No items found in this category.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CategoryPage;
