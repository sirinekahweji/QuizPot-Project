import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext';


import axios from 'axios';
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

const Dashboard = () => {
  const { user } = useAuthContext();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        console.log("responnce",response);
        const { totalUsers, totalQuizzes, totalQuestions, quizzesPerDay, accountsPerDay } = response.data;

        setTotalUsers(totalUsers);
        setTotalQuizzes(totalQuizzes);
        setTotalQuestions(totalQuestions);
        setQuizData(quizzesPerDay);
        setAccountData(accountsPerDay);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, [user]);

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
                {totalUsers}
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
                {totalQuizzes}
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
                {totalQuestions}
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
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="purple" />
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
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="orange" />
              </LineChart>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
