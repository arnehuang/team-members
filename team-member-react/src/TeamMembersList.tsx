import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
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
import TeamMemberCard from './components/TeamMemberCard';
import { getErrorMessage } from './errorUtils';
import ErrorSnackbar from './components/ErrorSnackbar';

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

  const location = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarDetails, setSnackbarDetails] = useState('');

  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const handleClose = () => {
    setErrorOpen(false);
  };

  useEffect(() => {
    fetchTeamMembers();
    if (location.state?.message) {
      setSnackbarMessage(location.state.message);
      setSnackbarDetails(location.state.details || '');
      setSnackbarOpen(true);
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [location, navigate]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
      .catch((error) => {
        console.error('Error fetching member:', error);
        const errorMessage = getErrorMessage(error);
        setApiError(errorMessage);
        setErrorOpen(true);
      });
  };

  const handleSearch = () => {
    setSearchPerformed(true);

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

  const handleClear = () => {
    setSearchParams({}); // Reset search parameters
    setSearchPerformed(false); // Reset the search performed flag
    fetchTeamMembers(); // Fetch the original list without filters
  };

  return (
    <Container>
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
            aria-label="Add team member"
            title="Add team member"
            onClick={() => navigate('/add')}
            sx={{ fontSize: '3rem' }}
          >
            <AddCircleOutlineIcon sx={{ fontSize: '2.5rem' }} />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" sx={{ color: grey[600] }}>
          There&apos;s {pagination?.count} team member
          {pagination?.count !== 1 ? 's' : ''}
          {searchPerformed && Object.keys(searchParams).length > 0
            ? ' matching your search criteria.'
            : ' in total.'}
        </Typography>
        <Box
          sx={{
            mb: 4,
            mt: 2,
            flexDirection: { xs: 'column' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: { xs: 2, sm: 2 },
            }}
          >
            <TextField
              label="Email contains..."
              value={searchParams.emailContains || ''}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  emailContains: e.target.value,
                })
              }
              sx={{
                flexGrow: 1,
                minWidth: 120,
                mb: { xs: 2, sm: 0 },
                mr: 1,
              }}
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
              sx={{ minWidth: 120, mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}
            >
              <MenuItem value="">Role</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="regular">Regular</MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              onClick={handleSearch}
              aria-label="Search for team members"
              title="Search for team members"
              sx={{ minWidth: 60, mb: { xs: 2, sm: 0 }, mr: 1 }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              onClick={handleClear}
              aria-label="Clear search parameters"
              title="Clear search parameters"
              sx={{
                minWidth: 60,
                backgroundColor: 'green',
                '&:hover': {
                  backgroundColor: 'darkgreen',
                },
                mb: { xs: 2, sm: 0 },
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
        <List sx={{ columnCount: { xs: 1, sm: 2, md: 3 }, columnGap: '16px' }}>
          {teamMembers.map((member) => (
            <Box key={member.id} sx={{ breakInside: 'avoid', marginBottom: 2 }}>
              <TeamMemberCard member={member} />
            </Box>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <IconButton
            onClick={handlePrevious}
            disabled={!pagination?.previous}
            aria-label="Previous page of team members"
            title="Previous page of team members"
          >
            {<NavigateBeforeIcon />}
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={!pagination?.next}
            aria-label="Next page of team members"
            title="Next page of team members"
          >
            {<NavigateNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={12000}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
          {snackbarDetails && <div>{snackbarDetails}</div>}
        </Alert>
      </Snackbar>
      <ErrorSnackbar
        open={errorOpen}
        errorMessage={apiError}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default TeamMembersList;
