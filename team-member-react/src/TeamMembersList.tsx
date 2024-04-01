import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { TeamMember } from './types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
  results: TeamMember[];
}

const TeamMembersList: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [searchParams, setSearchParams] = useState<{
    emailContains?: string;
    role?: string;
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = (queryParams?: {
    email__icontains?: string;
    role?: string;
  }) => {
    axios
      .get('/api/', { params: queryParams })
      .then((response) => {
        setPagination(response.data);
        setTeamMembers(response.data.results);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleSearch = () => {
    const queryParams: { email__icontains?: string; role?: string } = {};

    if (searchParams.emailContains) {
      queryParams.email__icontains = searchParams.emailContains;
    }

    if (searchParams.role) {
      queryParams.role = searchParams.role;
    }

    fetchTeamMembers(queryParams);
  };

  const handleNext = () => {
    if (pagination && pagination.next) {
      axios
        .get(pagination.next)
        .then((response) => {
          setPagination(response.data);
          setTeamMembers(response.data.results);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  };

  const handlePrevious = () => {
    if (pagination && pagination.previous) {
      axios
        .get(pagination.previous)
        .then((response) => {
          setPagination(response.data);
          setTeamMembers(response.data.results);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            Team members
          </Typography>
          <IconButton
            color="primary"
            aria-label="add team member"
            onClick={() => navigate('/add')}
            sx={{ fontSize: '3rem' }}
          >
            <AddCircleOutlineIcon sx={{ fontSize: '2.5rem' }} />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" sx={{ color: grey[600] }}>
          You have {pagination?.count} team members.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 2 }}>
          <TextField
            label="Email contains..."
            value={searchParams.emailContains || ''}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                emailContains: e.target.value,
              })
            }
            sx={{ flexGrow: 1, mr: 2 }}
          />
          <Select
            value={searchParams.role || ''}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                role: e.target.value || undefined,
              })
            }
            displayEmpty
            sx={{ minWidth: 120, mr: 2 }}
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="regular">Regular</MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ minWidth: 120 }}
          >
            Search
          </Button>
        </Box>
        <List>
          {teamMembers.map((member) => (
            <ListItem key={member.id} divider>
              <ListItemAvatar>
                <Avatar>{member.first_name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {`${member.first_name} ${member.last_name}`}{' '}
                    {member.role === 'admin' && '(admin)'}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      display="block"
                    >
                      {member.phone_number}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      display="block"
                    >
                      {member.email}
                    </Typography>
                  </>
                }
              />
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => navigate(`/edit/${member.id}`)}
              >
                <EditIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <IconButton onClick={handlePrevious} disabled={!pagination?.previous}>
            {<NavigateBeforeIcon />}
          </IconButton>
          <IconButton onClick={handleNext} disabled={!pagination?.next}>
            {<NavigateNextIcon />}
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default TeamMembersList;
