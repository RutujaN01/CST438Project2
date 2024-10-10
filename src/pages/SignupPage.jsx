import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  
import googleLogo from '../assets/images/google.png';
import headerImage from '../assets/images/logo.png'; 
import axios from "axios";

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

  const navigate = useNavigate();  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = formData.password;
    const isValidPassword = validatePasswordStrength(password);
    
    if (!isValidPassword) {
        alert('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
        return; 
    }

    console.dir(formData);
    const data = await axios.post(`http://127.0.0.1:8000/users/newuser/`, {
        "username": formData.fullName,
        "password": formData.password,
        "email": formData.email
    });

    console.dir(data);
    
    // Save refresh, access, and user data to local storage
    // Handle form submission logic
    console.log("Sign Up form data:", formData);
};

const validatePasswordStrength = (password) => {
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordStrengthRegex.test(password);
};

  const handleLoginNavigation = () => {
    console.log("Navigating to login page");
    navigate('/login');
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
              data-testid="full-name"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.input}
            />
            <TextInput
              type="email"
              name="email"
              placeholder="Enter Email"
              data-testid="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            <TextInput
              type="password"
              name="password"
              placeholder="Enter Password"
              data-testid="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            <TextInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              data-testid="confirm-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
            <Button data-testid="signup-button" type="submit" style={styles.submitButton} onClick={handleSubmit}>Sign Up</Button>
            <View style={styles.optionsContainer}>
              <Text style={styles.tologin}>
                Already have an account?
              </Text>
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: '100vw',
    height: "100vh", 
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
    zIndex: 1000,
    justifyContent: 'space-between', 
  },
  headerImage: {
    width: '150px', 
    height: '150px', 
    position: 'fixed',
    marginLeft: '-15px', 
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    paddingTop: '60px', 
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

export default SignupPage;