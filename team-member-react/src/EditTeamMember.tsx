import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container, FormControl, MenuItem, IconButton, Tooltip, } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { grey } from '@mui/material/colors';

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

interface TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role: string;
}

const EditTeamMember: React.FC = () => {
  const [teamMember, setTeamMember] = useState<TeamMember>({
    id: 0,
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: 'regular'
  });
  const [errors, setErrors] = useState({
    phone_number: '',
    email: ''
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/${id}`)
      .then(response => setTeamMember(response.data))
      .catch(error => console.error('Error fetching member:', error));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamMember({ ...teamMember, [name]: value });
    
    // Clear previous errors
    if (name === 'phone_number' && phoneRegex.test(value)) {
      setErrors({ ...errors, phone_number: '' });
    } else if (name === 'email' && emailRegex.test(value)) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    // Validate before submitting
    if (!phoneRegex.test(teamMember.phone_number)) {
      setErrors({ ...errors, phone_number: 'Invalid phone number' });
      return;
    }
    if (!emailRegex.test(teamMember.email)) {
      setErrors({ ...errors, email: 'Invalid email' });
      return;
    }
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
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Edit Team Member
        </Typography>
        <Typography variant="subtitle1" sx={{ color: grey[600], marginBottom: 2 }}>
          Set contact information and role.
        </Typography>
        <form onSubmit={handleSave}>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
            Info
          </Typography>
          <FormControl fullWidth margin="normal">
            <TextField
              label="First Name"
              name="first_name"
              value={teamMember.first_name}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Last Name"
              name="last_name"
              value={teamMember.last_name}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Phone Number"
              name="phone_number"
              value={teamMember.phone_number}
              onChange={handleChange}
              error={!!errors.phone_number}
              helperText={errors.phone_number}
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              name="email"
              value={teamMember.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
            />
          </FormControl>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Role
            <Tooltip title="Regular roles can't delete team members while admins can.">
              <IconButton size="small">
                <HelpOutlineIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Typography>
          <FormControl fullWidth margin="normal">
            <TextField
              select
              label="Role"
              name="role"
              value={teamMember.role}
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value="regular">Regular</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditTeamMember;
