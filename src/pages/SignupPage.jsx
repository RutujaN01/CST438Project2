import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  // Add this import for navigation
import googleLogo from '../assets/images/google.png';
import headerImage from '../assets/images/logo.png'; // Add your header image path here

// Simplified component names like in React Native or React Native Web
const View = ({ style, children }) => <div style={style}>{children}</div>;
const Text = ({ style, children }) => <p style={style}>{children}</p>;
const Button = ({ onClick, style, children, type = "button" }) => (
  <button onClick={onClick} style={style} type={type}>{children}</button>
);
const TextInput = ({ value, onChange, style, placeholder, name, type = 'text' }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    style={style}
    placeholder={placeholder}
  />
);

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();  // Initialize navigate for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Sign Up form data:", formData);
  };

  const handleLoginNavigation = () => {
    console.log("Navigating to login page");
    navigate('/login');
};

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      width: '100vw',
      height: "100vh", // Adjust height for fixed header
      backgroundColor: "#2A2732",
    },
    headerBar: {
      display: 'flex',
      backgroundColor: '#2B2438',
      padding: '5px',
      alignItems: 'center',
      width: '100%',
      height: '60px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000, // Ensures the header is above other elements
      justifyContent: 'space-between', // Space between elements
    },
    headerImage: {
      width: '150px', // Adjust the width as needed
      height: '150px', // Adjust the height as needed
      position: 'fixed',
      marginLeft: '-15px', // Add left margin if neede
    },
    mainContent: {
      display: 'flex',
      flex: 1,
      paddingTop: '60px', // Padding to accommodate fixed header
    },
    leftSection: {
      flex: 1,
      backgroundColor: "#2B2438",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width:'400px',

    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      marginBottom: '40px',
      justifyContent:"centre",
      alignItems:"centre",
    },
    googleButton: {
      backgroundColor: "#fff",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      borderRadius: "5px",
      cursor: "pointer",
      border: "none",
      outline: "none"
    },
    googleIcon: {
      width: "20px",
      marginRight: "10px"
    },
    rightSection: {
      flex: 2,
      backgroundColor: "#E5E5E5",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      
    },
    formTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      marginLeft: "100px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "80%",
      maxWidth: "400px"
    },
    input: {
      padding: "15px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #2A2732",
      fontSize: "16px",
      marginLeft: "100px",
      width: "350px",
    },
    submitButton: {
      padding: "15px",
      backgroundColor: "#2B2438",
      color: "#fff",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginLeft: "100px",
      width: "350px",
    },
    optionsContainer: {
      display: 'flex',
      width: '100%',
      fontSize: '12px',
    },
    tologinlink: {
      color: '#007BFF',
      textDecoration: 'underline',
      cursor: 'pointer',
      marginTop: '10px',
    },
    tologin: {
      color: '#000',
      marginTop: '10px',
      marginRight: '5px',
      marginLeft: "100px",
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <img src={headerImage} alt="Header" style={styles.headerImage} />
      </View>

      {/* Main Content Container */}
      <View style={styles.mainContent}>
        {/* Left Section for Google Signup */}
        <View style={styles.leftSection}>
          <Text style={styles.title}>SIGN UP WITH GOOGLE</Text>
          <Button style={styles.googleButton}>
            <img src={googleLogo} alt="Google Logo" style={styles.googleIcon} />
            <Text>Sign Up with Google</Text>
          </Button>
        </View>

        {/* Right Section for Form Inputs */}
        <View style={styles.rightSection}>
          <Text style={styles.formTitle}>SIGN UP</Text>
          <View as="form" onSubmit={handleSubmit} style={styles.form}>
            <TextInput
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.input}
            />
            <TextInput
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            <TextInput
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            <TextInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
            <Button type="submit" style={styles.submitButton}>Sign Up</Button>
            <View style={styles.optionsContainer}>
              <Text style={styles.tologin}>
                Already have an account?
              </Text>

              {/* Link to navigate to login page */}
              <span style={styles.tologinlink} onClick={handleLoginNavigation}>
                LogIn
              </span>
            
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignupPage;