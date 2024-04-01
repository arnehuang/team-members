import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeamMemberForm from './components/TeamMemberForm';
import { TeamMember } from './types';
import ErrorSnackbar from './components/ErrorSnackbar';

const AddTeamMember: React.FC = () => {
  const [teamMember, setTeamMember] = useState<TeamMember>({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: 'regular',
  });
  const [apiError, setApiError] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post('/api/add/', teamMember)
      .then(() => navigate('/'))
      .catch((error) => {
        console.error('Error adding member:', error);
        const errorMessage = error.response?.data?.error?.email
          ? String(error.response?.data?.error?.email[0])
          : 'Unexpected error while adding team member!';
        setApiError(errorMessage);
        setErrorOpen(true);
      });
  };

  const handleClose = () => {
    setErrorOpen(false);
  };
  return (
    <>
      <TeamMemberForm
        teamMember={teamMember}
        setTeamMember={setTeamMember}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
      <ErrorSnackbar
        open={errorOpen}
        errorMessage={apiError}
        handleClose={handleClose}
      />
    </>
  );
};

export default AddTeamMember;
