import React, { useState, useContext } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardComponent from '../components/Dashboard/Dashboard';
import UsersComponent from '../components/Dashboard/Users';
import QuizzesComponent from '../components/Dashboard/Quizzes';
import { useLogout } from "../Hooks/useLogout";
import { LangContext } from '../context/LangContext';
import './Dashboard.css'; // Assurez-vous d'importer le fichier CSS

const Sidebar = styled(Box)(({ theme }) => ({
  width: 240,
  position: 'fixed',
  top: 70,
  left: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  boxShadow: theme.shadows[2],
  display: 'flex',
  flexDirection: 'column',
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: 240,
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
  const logout = useLogout();
  const { currentLangData } = useContext(LangContext);

  const handleClick = () => {
    logout();
  };

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
            <ListItemIcon className="icon-fade">
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={currentLangData.dashboard.dashboard} />
          </ListItemStyled>
          <ListItemStyled
            button
            onClick={() => setSelectedComponent('Users')}
            selected={selectedComponent === 'Users'}
          >
            <ListItemIcon className="icon-fade">
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={currentLangData.dashboard.users} />
          </ListItemStyled>
          <ListItemStyled
            button
            onClick={() => setSelectedComponent('Quizzes')}
            selected={selectedComponent === 'Quizzes'}
          >
            <ListItemIcon className="icon-fade">
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary={currentLangData.dashboard.quizzes} />
          </ListItemStyled>
          <Box mt="auto">
            <ListItem onClick={handleClick}>
              <ListItemIcon className="icon-fade">
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={currentLangData.dashboard.logout} />
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
