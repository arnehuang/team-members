import React from 'react';
import { TeamMember } from './../types';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const navigate = useNavigate();

  return (
    // Ensure accessability for keyboard navigation
    <ListItem key={member.id} divider tabIndex={0}>
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
            <Typography component="span" variant="body2" display="block">
              {member.phone_number}
            </Typography>
            <Typography component="span" variant="body2" display="block">
              {member.email}
            </Typography>
          </>
        }
      />
      <IconButton
        edge="end"
        aria-label="Edit"
        title="Edit"
        onClick={() => navigate(`/edit/${member.id}`)}
      >
        <EditIcon />
      </IconButton>
    </ListItem>
  );
};

export default TeamMemberCard;
