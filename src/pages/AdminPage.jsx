import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, IconButton, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, Snackbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const AdminPage = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [editUserIndex, setEditUserIndex] = useState(null);
    const [editedUsername, setEditedUsername] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const accessToken = `Bearer ${localStorage.getItem("access")}`;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/`, {
                    headers: {
                        "Authorization": accessToken
                    }
                });
                setUsers(response.data.data);
                localStorage.setItem('users', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [accessToken]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDeleteUser = async (username) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/delete/user`, {
                data: { username },
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access")}`
                }
            });
            const updatedUsers = users.filter(user => user.username !== username);
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            showSnackbar('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
            showSnackbar('Failed to delete user. Please try again.');
        }
    };

    const startEditingUser = (index) => {
        setEditUserIndex(index);
        setEditedUsername(users[index].username);
        setEditedEmail(users[index].email);
    };

    const saveEditedUser = async () => {
        const updatedUsers = [...users];
        const userId = updatedUsers[editUserIndex].id;

        try {
            await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/update`, {
                id: userId,
                username: editedUsername,
                email: editedEmail
            }, {
                headers: {
                    "Authorization": accessToken
                }
            });

            updatedUsers[editUserIndex] = {
                ...updatedUsers[editUserIndex],
                username: editedUsername,
                email: editedEmail
            };

            setUsers(updatedUsers);
            showSnackbar('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            showSnackbar('Failed to update user. Please try again.');
        } finally {
            setEditUserIndex(null);
        }
    };

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            {/* Menu button to open the drawer */}
            <IconButton onClick={toggleDrawer}>
                <MenuIcon />
            </IconButton>

            {/* Drawer component */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <div style={{ width: 250 }}>
                    <IconButton onClick={toggleDrawer}>
                        <CloseIcon />
                    </IconButton>
                    <List>
                        <ListItem button>
                            USERS
                        </ListItem>
                        <ListItem button>
                            ITEMS
                        </ListItem>
                    </List>
                </div>
            </Drawer>

            {/* Wrapper to add margin for the heading and table */}
            <div style={{ marginLeft: '20px' }}>
                <h1>Admin - Manage Users</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.username}>
                                <TableCell>
                                    {editUserIndex === index ? (
                                        <TextField
                                            value={editedUsername}
                                            onChange={(e) => setEditedUsername(e.target.value)}
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editUserIndex === index ? (
                                        <TextField
                                            value={editedEmail}
                                            onChange={(e) => setEditedEmail(e.target.value)}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editUserIndex === index ? (
                                        <>
                                            <Button onClick={saveEditedUser}>Save</Button>
                                            <Button onClick={() => setEditUserIndex(null)}>Cancel</Button>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton><FaPencilAlt onClick={() => startEditingUser(index)} /></IconButton>
                                            <IconButton><FaTrash onClick={() => handleDeleteUser(user.username)} /></IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </div>
    );
};

export default AdminPage;