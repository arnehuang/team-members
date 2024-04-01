import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import TeamMemberForm from './components/TeamMemberForm';
import { TeamMember } from './types';
import ErrorSnackbar from './components/ErrorSnackbar';
import { getErrorMessage } from './errorUtils';

const EditTeamMember: React.FC = () => {
  const [teamMember, setTeamMember] = useState<TeamMember>({
    id: 0,
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: 'regular',
  });
  const [originalTeamMember, setOriginalTeamMember] =
    useState<TeamMember>(teamMember);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const handleClose = () => {
    setErrorOpen(false);
  };

  useEffect(() => {
    axios
      .get(`/api/${id}`)
      .then((response) => {
        setTeamMember(response.data);
        setOriginalTeamMember(response.data);
      })
      .catch((error) => {
        console.error('Error fetching member:', error);
        const errorMessage = getErrorMessage(error);
        setApiError(errorMessage);
        setErrorOpen(true);
      });
  }, [id]);

  const getDifferenceMessage = () => {
    const changes = [];
    if (teamMember.first_name !== originalTeamMember.first_name) {
      changes.push(
        `first name: ${originalTeamMember.first_name} -> ${teamMember.first_name}`,
      );
    }
    if (teamMember.last_name !== originalTeamMember.last_name) {
      changes.push(
        `last name: ${originalTeamMember.last_name} -> ${teamMember.last_name}`,
      );
    }
    if (teamMember.phone_number !== originalTeamMember.phone_number) {
      changes.push(
        `phone number: ${originalTeamMember.phone_number} -> ${teamMember.phone_number}`,
      );
    }
    if (teamMember.email !== originalTeamMember.email) {
      changes.push(`email: ${originalTeamMember.email} -> ${teamMember.email}`);
    }
    if (teamMember.role !== originalTeamMember.role) {
      changes.push(`role: ${originalTeamMember.role} -> ${teamMember.role}`);
    }
    return changes.join(', ');
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .put(`/api/${id}/edit/`, teamMember)
      .then(() =>
        navigate('/', {
          state: {
            message: `Team member with email ${teamMember.email} updated successfully`,
            details: getDifferenceMessage(),
          },
          replace: true,
        }),
      )
      .catch((error) => {
        console.error('Error updated member:', error);
        const errorMessage = getErrorMessage(error);
        setApiError(errorMessage);
        setErrorOpen(true);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      axios
        .delete(`/api/${id}/delete/`)
        .then(() =>
          navigate('/', {
            state: {
              message: `Team member deleted successfully: ${teamMember.email} `,
            },
          }),
        )
        .catch((error) => {
          console.error('Error deleting member:', error);
          const errorMessage = getErrorMessage(error);
          setApiError(errorMessage);
          setErrorOpen(true);
        });
    }
  };

  return (
    <>
      <TeamMemberForm
        teamMember={teamMember}
        setTeamMember={setTeamMember}
        onSubmit={handleSave}
        onCancel={() => navigate('/')}
        extraButtons={
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            title="Delete team member"
            aria-label="Delete team member"
          >
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
