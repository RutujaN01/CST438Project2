
import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, IconButton,  Table, TableHead, TableRow, TableCell, TableBody,  TextField, Button,  Snackbar,  CircularProgress,  Dialog,  DialogActions, DialogContent, DialogTitle,  Fab} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add'; 
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const ItemsPage = () => {
    const navigate = useNavigate(); 
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [editItemIndex, setEditItemIndex] = useState(null);
    const [editedItem, setEditedItem] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });
    const [newItemDialogOpen, setNewItemDialogOpen] = useState(false); 
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        url: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const accessToken = `Bearer ${localStorage.getItem("access")}`;

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/items/`, {
                    headers: {
                        "Authorization": accessToken
                    }
                });
                console.log('Fetched items:', response.data);
                const fetchedItems = Array.isArray(response.data) ? response.data : [];
                setItems(fetchedItems);
                localStorage.setItem('items', JSON.stringify(fetchedItems));
            } catch (error) {
                console.error('Error fetching items:', error);
                setItems([]);
                showSnackbar('Failed to fetch items. Please try again.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchItems();
    }, [accessToken]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/items/remove/item`, {
                data: { id: itemId },
                headers: {
                    "Authorization": accessToken
                }
            });
            const updatedItems = items.filter(item => item.id !== itemId);
            setItems(updatedItems);
            localStorage.setItem('items', JSON.stringify(updatedItems));
            showSnackbar('Item deleted successfully!');
        } catch (error) {
            console.error('Error deleting item:', error);
            showSnackbar('Failed to delete item. Please try again.');
        }
    };

    const startEditingItem = (index) => {
        setEditItemIndex(index);
        setEditedItem({
            name: items[index].name,
            description: items[index].description,
            price: items[index].price,
            category: items[index].category
        });
    };

    const saveEditedItem = async () => {
        const updatedItems = [...items];
        const itemId = updatedItems[editItemIndex].id;

        try {
            await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/items/update/item`, {
                id: itemId,
                ...editedItem 
            }, {
                headers: {
                    "Authorization": accessToken
                }
            });

            updatedItems[editItemIndex] = {
                ...updatedItems[editItemIndex],
                ...editedItem 
            };

            setItems(updatedItems);
            showSnackbar('Item updated successfully!');
        } catch (error) {
            console.error('Error updating item:', error);
            showSnackbar('Failed to update item. Please try again.');
        } finally {
            setEditItemIndex(null);
            setEditedItem({ name: '', description: '', price: '', category: '' });
        }
    };

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleAddNewItem = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/items/newitem`, newItem, {
                headers: {
                    "Authorization": accessToken
                }
            });
            console.log('Item added successfully:', response.data);
            
            setItems([...items, response.data]); 
            showSnackbar('Item added successfully!'); 
    
            setNewItem({
                name: '',
                price: '',
                description: '',
                category: '',
                url: '',
            });
    
            handleCloseNewItemDialog(); 
        } catch (error) {
            console.error('Error adding item:', error.response.data);
            showSnackbar('Failed to add item. Please try again.'); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddNewItem();
    };
    const handleOpenNewItemDialog = () => {
        setNewItemDialogOpen(true);
    };

    const handleCloseNewItemDialog = () => {
        setNewItemDialogOpen(false);
        // Reset fields after closing
        setNewItem({ name: '', description: '', price: '', category: '' });
    };

    return (
        <div>
            <IconButton onClick={toggleDrawer}>
                <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <div style={{ width: 250 }}>
                    <IconButton onClick={toggleDrawer}>
                        <CloseIcon />
                    </IconButton>
                    <List>
                        <ListItem button onClick={() => navigate('/admin')}>
                            USERS
                        </ListItem>
                        <ListItem button>
                            ITEMS
                        </ListItem>
                    </List>
                </div>
            </Drawer>

            <div style={{ marginLeft: '20px' }}>
                <h1>Admin - Manage Items</h1>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Item Name</b></TableCell>
                                <TableCell><b>Description</b></TableCell>
                                <TableCell><b>Price</b></TableCell>
                                <TableCell><b>Category</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.length > 0 ? (
                                items.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            {editItemIndex === index ? (
                                                <TextField
                                                    value={editedItem.name}
                                                    onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                                                />
                                            ) : (
                                                item.name
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editItemIndex === index ? (
                                                <TextField
                                                    value={editedItem.description}
                                                    onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                                                />
                                            ) : (
                                                item.description
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editItemIndex === index ? (
                                                <TextField
                                                    value={editedItem.price}
                                                    onChange={(e) => setEditedItem({ ...editedItem, price: e.target.value })}
                                                    type="number"
                                                />
                                            ) : (
                                                item.price
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editItemIndex === index ? (
                                                <TextField
                                                    value={editedItem.category}
                                                    onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })}
                                                />
                                            ) : (
                                                item.category
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editItemIndex === index ? (
                                                <Button onClick={saveEditedItem}>Save</Button>
                                            ) : (
                                                <>
                                                    <IconButton onClick={() => startEditingItem(index)}>
                                                        <FaPencilAlt />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDeleteItem(item.id)}>
                                                        <FaTrash />
                                                    </IconButton>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5}>No items found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* Floating Action Button */}
            <Fab
                color="white"
                aria-label="add"
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '60px'
                }}
                onClick={handleOpenNewItemDialog}
            >
                <AddIcon />
            </Fab>

            {/* New Item Dialog */}
<Dialog open={newItemDialogOpen} onClose={handleCloseNewItemDialog}>
    <DialogTitle>Add New Item</DialogTitle>
    <DialogContent>
        <TextField
            label="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Price"
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            fullWidth
            margin="normal"
        />
        {/* New URL field */}
        <TextField
            label="URL"
            value={newItem.url}
            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
            fullWidth
            margin="normal"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseNewItemDialog} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button> {/* Use handleSubmit for adding the new item */}
    </DialogActions>
</Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
};

export default ItemsPage;
