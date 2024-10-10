import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from '../pages/SignupPage'; 
import axios from 'axios';
import '@testing-library/jest-dom'; 

jest.mock('axios');

beforeEach(() => {
    window.alert = jest.fn(); 
});

it('renders the signup page correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    expect(getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('SIGN UP WITH GOOGLE')).toBeInTheDocument();
});

it('handles form submission', async () => {
    const mockResponse = {
      data: {
        username: 'testuser',
        email: 'test@example.com',
      },
    };
    axios.post.mockResolvedValue(mockResponse); 

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Full Name'), { target: { value: 'Test User' } });
    fireEvent.change(getByPlaceholderText('Enter Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Enter Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    fireEvent.click(getByText('Sign Up'));

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/users/newuser/', {
          username: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });
      });
});

it('navigates to login page when clicking the LogIn link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    fireEvent.click(getByText('LogIn'));

    expect(getByText('SIGN UP WITH GOOGLE')).toBeInTheDocument();
});

it('updates form input fields correctly', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    const fullNameInput = getByPlaceholderText('Full Name');
    const emailInput = getByPlaceholderText('Enter Email');
    const passwordInput = getByPlaceholderText('Enter Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(fullNameInput, { target: { value: 'New User' } });
    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'NewPassword123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123!' } });

    expect(fullNameInput.value).toBe('New User');
    expect(emailInput.value).toBe('newuser@example.com');
    expect(passwordInput.value).toBe('NewPassword123!');
    expect(confirmPasswordInput.value).toBe('NewPassword123!');
});

it('shows an alert for weak password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Full Name'), { target: { value: 'Weak Password User' } });
    fireEvent.change(getByPlaceholderText('Enter Email'), { target: { value: 'weakpassword@example.com' } });
    fireEvent.change(getByPlaceholderText('Enter Password'), { target: { value: 'weakpass' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'weakpass' } });

    fireEvent.click(getByText('Sign Up'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.'
      );
    });
});