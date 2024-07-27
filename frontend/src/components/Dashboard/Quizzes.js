import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext';
import axios from 'axios';
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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useAuthContext();

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
        Swal.fire(
          'Deleted!',
          'Your quiz has been deleted.',
          'success'
        );
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
      <Typography variant="h4" gutterBottom>
        Quizzes
      </Typography>
      <Paper elevation={3}>
        <TableContainer style={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Topic</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map((quiz) => (
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
