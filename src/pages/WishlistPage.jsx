import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; 

const WishlistPage = () => {
  const navigate = useNavigate();

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
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerBar}>
        <p style={styles.headerText}>My Wishlist</p>

        {/* User Icon */}
        <FaUserCircle style={styles.userIcon} onClick={() => navigate('/profile')} />
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Table */}
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeaderText}>Product Name</th>
              <th style={styles.tableHeaderText}>Price</th>
              <th style={styles.tableHeaderText}>Stock Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.productName}>{item.name}</td>
                <td style={styles.productPrice}>{item.price}</td>
                <td style={styles.productStatus}>{item.status}</td>
                <td>
                  <button
                    onClick={() => handleAddToCart(item)}
                    style={
                      item.status === 'In Stock'
                        ? styles.addButton
                        : { ...styles.addButton, ...styles.addButtonDisabled }
                    }
                    disabled={item.status !== 'In Stock'}
                  >
                    Add to cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
    justifyContent: 'space-between', // Change to space-between
  },
  headerText: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    marginLeft: '670px',
  },
  userIcon: {
    color: '#fff',
    fontSize: '30px',
    cursor: 'pointer',
    marginRight: '20px', 
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '80px',
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#2B2438',
    color: '#fff',
  },
  tableHeaderText: {
    padding: '10px',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ccc',
  },
  productName: {
    padding: '10px',
    textAlign: 'left',
  },
  productPrice: {
    padding: '10px',
    textAlign: 'center',
  },
  productStatus: {
    padding: '10px',
    textAlign: 'center',
  },
  addButton: {
    padding: '8px 12px',
    backgroundColor: '#2B2438',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addButtonDisabled: {
    backgroundColor: '#888888',
    cursor: 'not-allowed',
  },
};

export default WishlistPage;