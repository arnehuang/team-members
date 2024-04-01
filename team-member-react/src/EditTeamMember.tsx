import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import TeamMemberForm from './components/TeamMemberForm';
import { TeamMember } from './types';
import ErrorSnackbar from './components/ErrorSnackbar';

const EditTeamMember: React.FC = () => {
  const [teamMember, setTeamMember] = useState<TeamMember>({
    id: 0,
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: 'regular',
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`/api/${id}`)
      .then((response) => setTeamMember(response.data))
      .catch((error) => console.error('Error fetching member:', error));
  }, [id]);

  const getErrorMessage = (error: any): string => {
    if (error.response?.data?.error?.email) {
      return String(error.response.data.error.email[0]);
    } else if (
      error.response?.data?.error &&
      Array.isArray(error.response.data.error)
    ) {
      return String(error.response.data.error[0]);
    }
    return 'Unexpected error while adding team member!';
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .put(`/api/${id}/edit/`, teamMember)
      .then(() => navigate('/'))
      .catch((error) => {
        console.error('Error adding member:', error);
        const errorMessage = getErrorMessage(error);
        setApiError(errorMessage);
        setErrorOpen(true);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      axios
        .delete(`/api/${id}/delete/`)
        .then(() => navigate('/'))
        .catch((error) => {
          console.error('Error deleting member:', error);
          const errorMessage = getErrorMessage(error);
          setApiError(errorMessage);
          setErrorOpen(true);
        });
    }
  };

  const handleClose = () => {
    setErrorOpen(false);
  };

  return (
    <>
      <TeamMemberForm
        teamMember={teamMember}
        setTeamMember={setTeamMember}
        onSubmit={handleSave}
        onCancel={() => navigate('/')}
        extraButtons={
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />
      <ErrorSnackbar
        open={errorOpen}
        errorMessage={apiError}
        handleClose={handleClose}
      />
    </>
  );
};

export default EditTeamMember;
