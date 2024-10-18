import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

const ProfilePage = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [updatedData, setUpdatedData] = useState({ username: '', email: '' });
  const [editField, setEditField] = useState(null); 
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const accessToken = `Bearer ${localStorage.getItem("access")}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/get_current_user/`, {
          headers: {
            "Authorization": accessToken
          }
        });
        setUser(response.data.data);
        setUpdatedData({ username: response.data.data.username, email: response.data.data.email });
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      }
    };
    fetchUserData();
  }, [accessToken]);

  const handleUpdate = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/update`, {
        id: user.id,
        username: updatedData.username,
        email: updatedData.email,
      }, {
        headers: {
          "Authorization": accessToken
        }
      });

      setUser({ ...user, username: updatedData.username, email: updatedData.email });
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true); 
    } catch (err) {
      console.error(err);
      setSnackbarMessage('Failed to update profile');
      setSnackbarSeverity('error');
      setSnackbarOpen(true); 
    } finally {
      setEditField(null); 
    }
  };

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = '/login'; 
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#2C2C42', zIndex: 1000 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: '#FDFEFE' }}>
            Profile Page
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: '80px', textAlign: 'center' }}>
        <PersonIcon sx={{ fontSize: '100px', color: '#2C2C42' }} />
        <Typography variant="h4" sx={{ margin: '16px 0' }}>
          My Profile Page
        </Typography>

        {error && <Typography color="error">{error}</Typography>}
        <Box sx={{ marginBottom: '16px' }}>
          <Typography variant="h6">
            Username: {editField === 'username' ? (
              <TextField
                variant="outlined"
                value={updatedData.username}
                onChange={(e) => setUpdatedData({ ...updatedData, username: e.target.value })}
                size="small"
                sx={{ width: '200px', marginRight: '8px' }}
              />
            ) : (
              <span>{user.username}</span>
            )}
            <IconButton onClick={() => setEditField(editField === 'username' ? null : 'username')}>
              <EditIcon />
            </IconButton>
          </Typography>
          <Typography variant="h6">
            Email: {editField === 'email' ? (
              <TextField
                variant="outlined"
                type="email"
                value={updatedData.email}
                onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                size="small"
                sx={{ width: '200px', marginRight: '8px' }}
              />
            ) : (
              <span>{user.email}</span>
            )}
            <IconButton onClick={() => setEditField(editField === 'email' ? null : 'email')}>
              <EditIcon />
            </IconButton>
          </Typography>
        </Box>

        <Button variant="contained" onClick={handleUpdate} color="primary" sx={{ display: editField ? 'block' : 'none' }}>
          Update Profile
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePage;