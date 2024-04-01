import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { grey } from '@mui/material/colors';
import { TeamMember } from './../types';

interface TeamMemberFormProps {
  teamMember: TeamMember;
  setTeamMember: React.Dispatch<React.SetStateAction<TeamMember>>;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
  extraButtons?: JSX.Element;
}
const validateTeamMember = (teamMember: TeamMember) => {
  const errors: { [key: string]: string } = {};

  if (teamMember.first_name.trim() === '') {
    errors.first_name = 'First name is required';
  }
  if (teamMember.last_name.trim() === '') {
    errors.last_name = 'Last name is required';
  }
  if (
    !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(teamMember.phone_number) ||
    teamMember.phone_number.length < 10 ||
    teamMember.phone_number.length >= 15
  ) {
    errors.phone_number = 'Only use digits. Must be a valid phone number.';
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(teamMember.email)) {
    errors.email = 'Invalid email';
  }

  return errors;
};

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({
  teamMember,
  setTeamMember,
  onSubmit,
  onCancel,
  extraButtons,
}) => {
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setErrors(validateTeamMember(teamMember));
    }
  }, [teamMember, touched]);

  useEffect(() => {
    setErrors(validateTeamMember(teamMember));
  }, [teamMember]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamMember({ ...teamMember, [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validateTeamMember(teamMember));
  };

  const isSaveDisabled = Object.keys(errors).length > 0;

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          {teamMember.id ? 'Edit Team Member' : 'Add Team Member'}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: grey[600], marginBottom: 2 }}
        >
          Set contact information and role.
        </Typography>
        <form onSubmit={onSubmit}>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Info
          </Typography>

          <FormControl fullWidth margin="normal">
            <TextField
              label="First Name"
              name="first_name"
              value={teamMember.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.first_name && touched.first_name}
              helperText={touched.first_name ? errors.first_name : ''}
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Last Name"
              name="last_name"
              value={teamMember.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.last_name && touched.last_name}
              helperText={touched.last_name ? errors.last_name : ''}
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Phone Number"
              name="phone_number"
              value={teamMember.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.phone_number && touched.phone_number}
              helperText={touched.phone_number ? errors.phone_number : ''}
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              name="email"
              value={teamMember.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.email && touched.email}
              helperText={touched.email ? errors.email : ''}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
            {extraButtons}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSaveDisabled}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
export default TeamMemberForm;
