import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FormControl, InputAdornment, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import TeamMemberForm from './components/TeamMemberForm';
import { TeamMember } from './types';

const AddTeamMember: React.FC = () => {
  const [teamMember, setTeamMember] = useState<TeamMember>({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: 'regular'
  });
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post('/api/add/', teamMember)
      .then(() => navigate('/'))
      .catch(error => console.error('Error adding member:', error));
  };

  return (
    <TeamMemberForm
      teamMember={teamMember}
      setTeamMember={setTeamMember}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/')}
    />
  );
};

export default AddTeamMember;
