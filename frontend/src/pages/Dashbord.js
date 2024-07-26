import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const quizData = [
  { name: 'Day 1', quizzes: 3 },
  { name: 'Day 2', quizzes: 5 },
  { name: 'Day 3', quizzes: 2 },
  { name: 'Day 4', quizzes: 6 },
  { name: 'Day 5', quizzes: 4 },
  { name: 'Day 6', quizzes: 7 },
  { name: 'Day 7', quizzes: 3 },
];

const accountData = [
  { name: 'Day 1', accounts: 2 },
  { name: 'Day 2', accounts: 4 },
  { name: 'Day 3', accounts: 1 },
  { name: 'Day 4', accounts: 5 },
  { name: 'Day 5', accounts: 3 },
  { name: 'Day 6', accounts: 6 },
  { name: 'Day 7', accounts: 2 },
];

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
];

const quizzes = [
  { id: 1, title: 'Math Quiz', creator: 'John Doe', date: '2024-07-20' },
  { id: 2, title: 'Science Quiz', creator: 'Jane Smith', date: '2024-07-21' },
  { id: 3, title: 'History Quiz', creator: 'Mike Johnson', date: '2024-07-22' },
];

const Sidebar = styled(Box)(({ theme }) => ({
  width: 200,
  position: 'fixed',
  top: 70,
  left: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: 200,
  marginTop: -70,
  padding: theme.spacing(3),
  flexGrow: 1,
}));

const CardStyled = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.getContrastText('#fff'),
  marginBottom: theme.spacing(2),
}));

const Dashboard = () => {
  return (
    <Box display="flex">
      <Sidebar>
        <List>
          <ListItem >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem >
            <ListItemIcon>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary="Quizzes" />
          </ListItem>
          <ListItem  onClick={() => alert('Logout')}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Sidebar>
      <MainContent>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CardStyled>
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  <PersonIcon /> Total Users
                </Typography>
                <Typography variant="h3" style={{ color: 'purple' }}>
                  120
                </Typography>
              </CardContent>
            </CardStyled>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardStyled>
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  <QuizIcon /> Total Quizzes
                </Typography>
                <Typography variant="h3" style={{ color: 'orange' }}>
                  80
                </Typography>
              </CardContent>
            </CardStyled>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardStyled>
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  <QuestionAnswerIcon /> Total Questions
                </Typography>
                <Typography variant="h3" style={{ color: 'purple' }}>
                  500
                </Typography>
              </CardContent>
            </CardStyled>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Quizzes Per Day
              </Typography>
              <Paper elevation={3}>
                <BarChart
                  width={500}
                  height={300}
                  data={quizData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quizzes" fill="purple" />
                </BarChart>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Accounts Created Per Day
              </Typography>
              <Paper elevation={3}>
                <LineChart
                  width={500}
                  height={300}
                  data={accountData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accounts" stroke="orange" />
                </LineChart>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            User Management
          </Typography>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <PersonIcon /> {user.name}
                      </TableCell>
                      <TableCell>
                        <MailOutlineIcon /> {user.email}
                      </TableCell>
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

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Quiz Management
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
      </MainContent>
    </Box>
  );
};

export default Dashboard;
