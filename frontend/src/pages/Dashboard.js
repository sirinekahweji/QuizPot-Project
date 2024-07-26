import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, styled,  } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardComponent from '../components/Dashboard/Dashboard';
import UsersComponent from '../components/Dashboard/Users';
import QuizzesComponent from '../components/Dashboard/Quizzes';

const Sidebar = styled(Box)(({ theme }) => ({
  width: 200,
  position: 'fixed',
  top: 70,
  left: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
  display: 'flex',
  flexDirection: 'column',
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: 200,
  marginTop: -70,
  padding: theme.spacing(3),
  flexGrow: 1,
}));

const ListItemStyled = styled(ListItem)(({ theme, selected }) => ({
  ...(selected && {
    color: 'black',
    fontWeight: 'bold',
  }),
}));

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Dashboard':
        return <DashboardComponent />;
      case 'Users':
        return <UsersComponent />;
      case 'Quizzes':
        return <QuizzesComponent />;
      default:
        return <DashboardComponent />;
    }
  };

  return (
    <Box display="flex">
      <Sidebar>

        <List>
          <ListItemStyled 
            button 
            onClick={() => setSelectedComponent('Dashboard')} 
            selected={selectedComponent === 'Dashboard'}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemStyled>
          <ListItemStyled 
            button 
            onClick={() => setSelectedComponent('Users')} 
            selected={selectedComponent === 'Users'}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemStyled>
          <ListItemStyled 
            button 
            onClick={() => setSelectedComponent('Quizzes')} 
            selected={selectedComponent === 'Quizzes'}
          >
            <ListItemIcon>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary="Quizzes" />
          </ListItemStyled>
          <Box mt="auto">
            <ListItem button onClick={() => alert('Logout')}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Box>
        </List>
      </Sidebar>
      <MainContent>
        {renderComponent()}
      </MainContent>
    </Box>
  );
};

export default Dashboard;
