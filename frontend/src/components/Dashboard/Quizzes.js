import React, { useEffect, useState,useContext } from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { LangContext } from '../../context/LangContext';
import axios from 'axios';
import Swal from 'sweetalert2';
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
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuthContext();
  const { currentLangData } = useContext(LangContext);


  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/responseForm/all', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/responseForm/delete/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        setQuizzes(quizzes.filter(quiz => quiz._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'The quiz has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting quiz:', error);
        Swal.fire(
          'Error!',
          'Failed to delete the quiz.',
          'error'
        );
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">{currentLangData.dashboard.quizzes} </Typography>
        <TextField
          variant="outlined"
          placeholder="Search quizzes"
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
                <TableCell>Topic</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes
                .filter(quiz => quiz.topic.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((quiz) => (
                  <TableRow key={quiz._id}>
                    <TableCell>{quiz.topic}</TableCell>
                    <TableCell>
                      <PersonIcon /> {quiz.userId.name}
                    </TableCell>
                    <TableCell>{quiz.createdAt}</TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" style={{ color: 'red' }} onClick={() => handleDelete(quiz._id)}>
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

export default Quizzes;
