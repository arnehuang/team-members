import React from 'react';
import { Container, TextField, Button, Typography, Box, FormControl, MenuItem, IconButton, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { grey } from '@mui/material/colors';
import { TeamMember } from './../types';

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

interface Errors {
    phone_number?: string;
    email?: string;
}

interface TeamMemberFormProps {
    teamMember: TeamMember;
    setTeamMember: React.Dispatch<React.SetStateAction<TeamMember>>;
    onSubmit: (event: React.FormEvent) => void;
    onCancel: () => void;
    extraButtons?: JSX.Element;
}
const validateTeamMember = (teamMember: TeamMember) => {
    let errors: { [key: string]: string } = {};
    if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(teamMember.phone_number)) {
      errors.phone_number = 'Invalid phone number';
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(teamMember.email)) {
      errors.email = 'Invalid email';
    }
    // Add other validation checks as needed
    return errors;
  };

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({
    teamMember,
    setTeamMember,
    onSubmit,
    onCancel,
    extraButtons
}) => {
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTeamMember({ ...teamMember, [name]: value });

        if (name === 'phone_number' && phoneRegex.test(value)) {
            setErrors({ ...errors, phone_number: '' });
        } else if (name === 'email' && emailRegex.test(value)) {
            setErrors({ ...errors, email: '' });
        }

        // Validate the changed field and update errors state
        const newErrors = validateTeamMember({ ...teamMember, [name]: value });
        setErrors(newErrors);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newErrors = validateTeamMember(teamMember);
        if (Object.keys(newErrors).length === 0) {
          onSubmit(event);
        } else {
          setErrors(newErrors);
        }
      };


    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    {teamMember.id ? 'Edit Team Member' : 'Add Team Member'}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: grey[600], marginBottom: 2 }}>
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
                        <Button variant="outlined" color="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                        {extraButtons}
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default TeamMemberForm;
