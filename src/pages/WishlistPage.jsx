import React, { useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'

const View = ({ style, children }) => <div style={style}>{children}</div>;
const Text = ({ style, children }) => <p style={style}>{children}</p>;
const Button = ({ onClick, style, children }) => (
  <button onClick={onClick} style={style}>{children}</button>
);

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlists, setWishlists] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate('/login');
    }

    // Update the wishlist
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/wishlists`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.data) {
          console.dir(response.data.data[0]);
          setWishlistItems(response.data.data[0].items);
          setWishlists(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    }

    fetchWishlist();
  }, [])
  const removeFromWishlist = async (itemId) => {
    console.log(`Item with ID ${itemId} removed from wishlist!`);
    const token = localStorage.getItem('access');
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate('/login');
    }
    // Find the wishlist the item belongs to
    const wishlist = wishlists.find(wishlist => wishlist.items.some(item => item.id === itemId));
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/wishlists/add-item`, {
      "wishlist_id": wishlist.id,
      "item_id": itemId
    },
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
    const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    // window.location.reload();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>My Wishlist</Text>
        <FaUserCircle style={styles.userIcon} onClick={() => navigate('/profile')} />
      </View>

      <View style={styles.mainContent}>
        <View style={styles.tableHeader}>
          <Text style={styles.productName}>Product Name</Text>
          <Text style={styles.productPrice}>Price</Text>
          <Text style={styles.productActions}>Actions</Text>
        </View>

        {wishlistItems.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${Number(item.price).toFixed(2)}</Text>
            <View style={styles.productActions}>
              {/* Delete Button */}
              <Button onClick={() => removeFromWishlist(item.id)} style={styles.actionButton}>
                <DeleteIcon />
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#E5E5E5',
  },
  headerBar: {
    display: 'flex',
    backgroundColor: '#2B2438',
    padding: '10px',
    alignItems: 'center',
    width: '100%',
    height: '60px',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '80px',
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '18px',
    borderBottom: '2px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  tableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
  },
  productName: {
    flex: 2,
  },
  productPrice: {
    flex: 1,
    textAlign: 'center',
  },
  productActions: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  userIcon: {
    color: '#fff',
    fontSize: '30px',
    cursor: 'pointer',
    marginRight: '20px',
  },
};

export default WishlistPage;