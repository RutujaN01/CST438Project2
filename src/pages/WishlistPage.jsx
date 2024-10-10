import React from 'react';
//import { useNavigate } from 'react-router-dom';

const View = ({ style, children }) => <div style={style}>{children}</div>;
const Text = ({ style, children }) => <p style={style}>{children}</p>;
const Button = ({ onClick, style, children }) => (
  <button onClick={onClick} style={style}>{children}</button>
);

const WishlistPage = () => {
  //const navigate = useNavigate();

  const wishlistItems = [
    { name: 'Apple iPhone 14, 128GB, Blue', price: '$999.00', status: 'In Stock' },
    { name: 'Nintendo Switch Pro Wireless Game Controller - Black', price: '$70.00', status: 'Out of Stock' },
  ];

  const handleAddToCart = (item) => {
    if (item.status === 'In Stock') {
      console.log(`${item.name} added to cart!`);
    }
  };

  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>My Wishlist</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.productName}>Product Name</Text>
          <Text style={styles.productPrice}>Price</Text>
          <Text style={styles.productStatus}>Stock Status</Text>
        </View>

        {/* Wishlist Items */}
        {wishlistItems.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.productStatus}>{item.status}</Text>
            <Button
              onClick={() => handleAddToCart(item)}
              style={
                item.status === 'In Stock'
                  ? styles.addButton
                  : { ...styles.addButton, ...styles.addButtonDisabled }
              }
              disabled={item.status !== 'In Stock'}
            >
              Add to cart
            </Button>
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
  productStatus: {
    flex: 1,
    textAlign: 'center',
  },
  addButton: {
    padding: '8px 12px',
    backgroundColor: '#2B2438',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    flex: 1,
  },
  addButtonDisabled: {
    backgroundColor: '#888888',
    cursor: 'not-allowed',
  },
};

export default WishlistPage;