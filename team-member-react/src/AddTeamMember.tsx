import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeamMemberForm from './components/TeamMemberForm';
import { TeamMember } from './types';
import ErrorSnackbar from './components/ErrorSnackbar';
import { getErrorMessage } from './errorUtils';

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
      .then(() =>
        navigate('/', {
          state: {
            message: `${teamMember.role} team member added successfully: ${teamMember.email}`,
          },
          replace: true,
        }),
      )
      .catch((error) => {
        console.error('Error adding member:', error);
        const errorMessage = getErrorMessage(error);
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
