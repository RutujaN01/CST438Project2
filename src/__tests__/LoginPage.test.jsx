import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import '@testing-library/jest-dom'; 

describe('LoginPage', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  });

  it('should render the username input field', () => {
    const usernameInput = screen.getByPlaceholderText('Username');
    expect(usernameInput).toBeInTheDocument(); 
  });

  it('should render the password input field', () => {
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument(); 
  });

  it('should toggle show/hide password when checkbox is clicked', () => {
    const passwordInput = screen.getByPlaceholderText('Password');
    const toggleCheckbox = screen.getByLabelText('Show Password');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleCheckbox);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('should trigger forgot password action when clicked', () => {
    const forgotPasswordText = screen.getByText('Forgot Password?');
    fireEvent.click(forgotPasswordText);
    expect(console.log).toHaveBeenCalledWith('Redirecting to forgot password page...');
  });

  it('should render the Google login button', () => {
    const googleLoginButton = screen.getByText('Login using Google');
    expect(googleLoginButton).toBeInTheDocument();
  });
});