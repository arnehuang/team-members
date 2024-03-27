import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamMembersList from './TeamMembersList';
import AddTeamMember from './AddTeamMember';
import EditTeamMember from './EditTeamMember';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeamMembersList />} />
        <Route path="/add" element={<AddTeamMember />} />
        <Route path="/edit/:id" element={<EditTeamMember />} />
      </Routes>
    </Router>
  );
};

export default App;
