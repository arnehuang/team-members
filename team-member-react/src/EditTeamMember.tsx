import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container, FormControl, MenuItem, IconButton, Tooltip, } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { grey } from '@mui/material/colors';
import TeamMemberForm from './components/TeamMemberForm';
import { TeamMember } from './types';

const EditTeamMember: React.FC = () => {
  const [teamMember, setTeamMember] = useState<TeamMember>({
    id: 0,
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: 'regular'
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/${id}`)
      .then(response => setTeamMember(response.data))
      .catch(error => console.error('Error fetching member:', error));
  }, [id]);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    axios.put(`/api/${id}/edit/`, teamMember)
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating member:', error));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      axios.delete(`/api/${id}/delete/`)
        .then(() => navigate('/'))
        .catch(error => console.error('Error deleting member:', error));
    }
  };

  return (
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
  );
};

export default EditTeamMember;
