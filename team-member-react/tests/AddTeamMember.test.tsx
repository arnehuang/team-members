import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddTeamMember from './../src/AddTeamMember';
import '@testing-library/jest-dom';

describe('AddTeamMember', () => {
  it('renders the form', () => {
    render(
      <Router>
        <AddTeamMember />
      </Router>
    );
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
  });
});
