import React, { useEffect, useState ,useContext} from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LangContext } from '../../context/LangContext';

import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuthContext();
  const { currentLangData } = useContext(LangContext);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/user/delete/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        setUsers(users.filter(user => user._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'The user has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire(
        'Error!',
        'There was an error deleting the user.',
        'error'
      );
    }
  };

  return (
    <Box>
         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">{currentLangData.dashboard.users} 
            
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search users"
            size="small"
            sx={{
              width: '250px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black', 
                },
                '&:hover fieldset': {
                  borderColor: 'black', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', 
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      <Paper elevation={3} style={{ padding: 16 }}>
        <TableContainer style={{ maxHeight: 386, overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <PersonIcon /> {user.name}
                    </TableCell>
                    <TableCell>
                      <MailOutlineIcon /> {user.email}
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" style={{ color: 'red' }} onClick={() => handleDelete(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Users;
