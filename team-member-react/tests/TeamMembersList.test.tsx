import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TeamMembersList from './../src/TeamMembersList';
import '@testing-library/jest-dom';

describe('TeamMembersList', () => {
    it('renders the component', () => {
        render(
            <Router>
                <TeamMembersList />
            </Router>);

        expect(screen.getByText('Team members')).toBeInTheDocument();
    });
});
