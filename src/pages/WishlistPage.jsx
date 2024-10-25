import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

const View = ({ style, children }) => <div style={style}>{children}</div>;
const Text = ({ style, children }) => <p style={style}>{children}</p>;
const Button = ({ onClick, style, children }) => (
  <button onClick={onClick} style={style}>{children}</button>
);

const WishlistPage = () => {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

  const removeFromWishlist = (itemId) => {
    console.log(`Item with ID ${itemId} removed from wishlist!`);

    const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    window.location.reload();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>My Wishlist</Text>
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
              {/* Heart Icon for "liked" functionality */}
              <Button onClick={() => console.log(`Liked ${item.name}`)} style={styles.actionButton}>
                <FavoriteIcon style={{ color: 'red' }} />
              </Button>
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
    justifyContent: 'center',
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
};

export default WishlistPage;