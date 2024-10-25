import React, { useState } from 'react';
import googleLogo from '../assets/images/google.png';
import headerImage from '../assets/images/logo.png'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
const View = ({ style, children }) => <div style={style}>{children}</div>;
const Text = ({ style, children }) => <p style={style}>{children}</p>;
const Button = ({ onClick, style, children }) => (
  <button onClick={onClick} style={style}>{children}</button>
);
const TextInput = ({ value, onChange, style, placeholder, type = 'text' }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    style={style}
    placeholder={placeholder}
  />
);
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
        const res = await axios.post(`http://127.0.0.1:8000/users/login/`, {
            username: username,
            password: password
        });

        const currentUser = res.data.user;  
        console.log('Login successful:', currentUser);

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (!Array.isArray(users)) {
            users = [];  
        }

        const userExists = users.find(user => user.username === currentUser.username);

        if (!userExists) {
            users.push({
                id: currentUser.id,  
                username: currentUser.username,
                email: currentUser.email,  
                roles: currentUser.roles
            });
            localStorage.setItem('users', JSON.stringify(users));  
        }

        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("user", JSON.stringify(currentUser));

        if (currentUser.roles.includes('admin')) {
            navigate('/admin');  
        } else {
            navigate('/home');   
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
};

  //const data = axios.post(`${process.env.REACT_APP_API_BASE}/users/login`, {"username": username, "password": password});

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSignIn = () => {
    navigate('/signup');
  };
  
  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
      <img src={headerImage} alt="Header" style={styles.headerImage} />
      </View>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Left Section */}
        <View style={styles.leftContainer}>
          <Text style={styles.title}>Login to your Account</Text>
          <View style={styles.googleButton}>
            <img src={googleLogo} alt="Google" style={styles.googleIcon} />
            <Text>Login using Google</Text>
          </View>
          <View style={styles.divider}>
                <span style={styles.orText}>OR</span>
            </View>
          <View as="form" onSubmit={handleLogin} style={styles.form}>
            <Text style={styles.label}>ENTER USERNAME</Text>
            <TextInput
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Username"
            />
            <Text style={styles.label}>ENTER PASSWORD</Text>
          <TextInput
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Password"
          />
           <View style={styles.optionsContainer}>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              Show Password
            </label>
            
          </View>
          <Button type="submit" style={styles.loginButton} onClick={handleLogin}>LOGIN</Button>
        </View>
      </View>
        {/* Right Section */}
        <View style={styles.rightContainer}>
          <Text style={styles.newHereTitle}>NEW HERE?</Text>
          <Text style={styles.newHereText}>Sign in and discover more</Text>
          <Button onClick={handleSignIn} style={styles.signInButton}>SIGN IN</Button>
        </View>
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
  leftContainer: {
    flex: 2,
    padding: '50px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '150px',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '30px',
    marginTop: '-150px',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  googleIcon: {
    width: '20px',
    marginRight: '10px',
  },
  divider: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px',
      marginBottom: '8px',
    },
  
    orText: {
      margin: '0 10px', 
      fontWeight: 'bold',
      fontSize: '13px',
    },
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  loginButton: {
    padding: '10px 20px',
    backgroundColor: '#2B2438',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop:'15px',
  },
  optionsContainer: {
      display: 'flex',
      justifyContent: 'space-between', 
      width: '100%',
      fontSize:'12px',
    },
    forgotPassword: {
      color: '#007BFF',
      textDecoration: 'underline',
      cursor: 'pointer',
      marginTop:'0px',
    },
  rightContainer: {
    flex: 1,
    backgroundColor: '#2B2438',
    color: '#fff',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
    alignItems: 'center',
  },
  newHereTitle: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginTop: '230px',
    marginBottom: '0px',
  },
  newHereText: {
      marginTop: '5px',
    marginBottom: '30px',
  },
  signInButton: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
export default LoginPage;