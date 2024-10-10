import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../pages/HomePage'; // Corrected import statement
//import '@testing-library/jest-dom'; // Ensure this import is included

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
  });

  it('renders the TechMart logo', () => {
    const logoElement = screen.getByAltText(/TechMart Logo/i);
    expect(logoElement).toBeInTheDocument();
  });

  it('renders the search input', () => {
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    expect(searchInput).toBeInTheDocument();
  });

  it('renders the Login button', () => {
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('renders the Admin button', () => {
    const adminButton = screen.getByRole('button', { name: /admin/i });
    expect(adminButton).toBeInTheDocument();
  });

  it('renders item images correctly', () => {
    const images = ['PHONES', 'TABLETS', 'TV', 'GADGETS'];
    images.forEach((image) => {
      const imgElements = screen.getAllByRole('img', { name: new RegExp(image, 'i') });
      imgElements.forEach((imgElement) => {
        expect(imgElement).toBeInTheDocument();
      });
    });
  });
});
