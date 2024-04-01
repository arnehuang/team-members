import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import TeamMembersList from './TeamMembersList';
import AddTeamMember from './AddTeamMember';
import EditTeamMember from './EditTeamMember';
import { Button } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you&apos;re looking for does not exist.</p>
      <Button onClick={goHome} variant="contained" color="primary">
        Go Home
      </Button>
    </div>
  );
};
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeamMembersList />} />
        <Route path="/add" element={<AddTeamMember />} />
        <Route path="/edit/:id" element={<EditTeamMember />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
