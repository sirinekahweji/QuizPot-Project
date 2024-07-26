import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

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

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                <PersonIcon /> Total Users
              </Typography>
              <Typography variant="h5" style={{ color: 'purple' }}>
                120
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                <QuizIcon /> Total Quizzes
              </Typography>
              <Typography variant="h5" style={{ color: 'orange' }}>
                80
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                <QuestionAnswerIcon /> Total Questions
              </Typography>
              <Typography variant="h5" style={{ color: 'purple' }}>
                500
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Quizzes Per Day
            </Typography>
            <Paper elevation={3}>
              <BarChart
                width={400}
                height={250}
                data={quizData}
                margin={{
                  top: 5,
                  right: 20,
                  left: 10,
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
            <Typography variant="subtitle1" gutterBottom>
              Accounts Created Per Day
            </Typography>
            <Paper elevation={3}>
              <LineChart
                width={400}
                height={250}
                data={accountData}
                margin={{
                  top: 5,
                  right: 20,
                  left: 10,
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
    </Box>
  );
};

export default Dashboard;
