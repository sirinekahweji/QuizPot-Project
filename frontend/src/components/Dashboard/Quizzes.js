// Quizzes.js
import React from 'react';
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

const quizzes = [
  { id: 1, title: 'Math Quiz', creator: 'John Doe', date: '2024-07-20' },
  { id: 2, title: 'Science Quiz', creator: 'Jane Smith', date: '2024-07-21' },
  { id: 3, title: 'History Quiz', creator: 'Mike Johnson', date: '2024-07-22' },
];

const Quizzes = () => {
  return (
    <Box>
        <Typography variant="h4" gutterBottom>
        Quizzes
      </Typography>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>
                    <PersonIcon /> {quiz.creator}
                  </TableCell>
                  <TableCell>{quiz.date}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" style={{ color: 'red' }}>
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
