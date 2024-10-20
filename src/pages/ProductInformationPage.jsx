import Typography from '@mui/material/Typography';
import { Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import axios from 'axios';

export const ProductInformationPage = () => {
  const theme = useTheme();
  const { productID } = useParams();  
  const [productInfo, setProductInfo] = useState(null);  // Product details
  const [relatedProducts, setRelatedProducts] = useState([]);  // Related products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        // Fetch product details
        const productResponse = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/items/get/${productID}`);
        setProductInfo(productResponse.data);
        
        // Fetch related products 
        const relatedResponse = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/items/related/${productID}`);
        setRelatedProducts(relatedResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product information.');
        setLoading(false);
      }
    };

    fetchProductInfo();
  }, [productID]);

  if (loading) {
    return <Typography>Loading product information...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Box sx={{ p: 2, height: '100vh', display: 'flex', flexDirection: 'column' }} alignItems="center" justifyContent="center">
        {productInfo && (
          <>
            <Typography textAlign="center" variant="h3" color="primary">{productInfo.name}</Typography>
            <Typography textAlign="center" variant="subtitle1" color="secondary">Category: {productInfo.category}</Typography>
            <img src={productInfo.imageUrl} alt={productInfo.name} style={{ maxWidth: '400px', margin: '20px auto' }} />
            <Typography textAlign="center" variant="body1">{productInfo.description}</Typography>
            <Typography textAlign="center" variant="h6" color="textSecondary">Price: ${productInfo.price}</Typography>
            <Typography textAlign="center" variant="body1">Specifications: {productInfo.specs}</Typography>
            
            <Typography variant="h4" sx={{ mt: 4 }}>Related Products</Typography>
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relatedProduct) => (
                <Box key={relatedProduct.id} sx={{ my: 2, border: '1px solid grey', p: 2 }}>
                  <Typography textAlign="center" variant="h6" color="primary">{relatedProduct.name}</Typography>
                  <Typography textAlign="center" variant="body1">{relatedProduct.description}</Typography>
                  <Typography textAlign="center" variant="body1" color="textSecondary">Price: ${relatedProduct.price}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No related products found.</Typography>
            )}
          </>
        )}
      </Box>
    </>
  );
};
