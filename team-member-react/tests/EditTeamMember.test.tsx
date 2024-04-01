import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import EditTeamMember from './../src/EditTeamMember';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EditTeamMember', () => {
  const mockTeamMember = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '1234567890',
    email: 'john@example.com',
    role: 'regular',
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockTeamMember });
  });

  it('loads and displays the team member data', async () => {
    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <Routes>
          <Route path="/edit/:id" element={<EditTeamMember />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    });
  });

  it('deletes the team member', async () => {
    global.confirm = jest.fn(() => true); // Mock confirmation dialog
    mockedAxios.delete.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <Routes>
          <Route path="/edit/:id" element={<EditTeamMember />} />
        </Routes>
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete team member' });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(global.confirm).toHaveBeenCalled();
      expect(mockedAxios.delete).toHaveBeenCalledWith('/api/1/delete/');
    });
  });
});
