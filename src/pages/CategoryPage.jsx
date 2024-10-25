import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

const CategoryPage = () => {
  const { category } = useParams(); 
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetch all items from your backend
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

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Items in {category || 'Unknown Category'}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card key={item.id} sx={{ width: '300px' }}>
              <CardMedia
                component="img"
                height="140"
                image={item.url} 
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No items found in this category.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CategoryPage;
