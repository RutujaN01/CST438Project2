import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for navigation tests
import HomePage from './HomePage'; // Adjust the path as needed

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  test('renders logo', () => {
    const logoElement = screen.getByAltText(/TechMart Logo/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('renders search bar', () => {
    const searchInput = screen.getByPlaceholderText(/search.../i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders Login button', () => {
    const loginButton = screen.getByText(/login/i);
    expect(loginButton).toBeInTheDocument();
  });

  test('renders Admin button', () => {
    const adminButton = screen.getByText(/admin/i);
    expect(adminButton).toBeInTheDocument();
  });

  test('navigates to login page on Login button click', () => {
    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);
    // Check if it navigates to the login page
    // You might want to assert the expected behavior or URL change
  });

  test('renders boxes with content', () => {
    const boxesContent = ['PHONES', 'TABLETS', 'TV', 'GADGETS'];
    boxesContent.forEach((item) => {
      const boxButton = screen.getByText(item);
      expect(boxButton).toBeInTheDocument();
    });
  });

  test('renders banner image', () => {
    const bannerImage = screen.getByAltText(/banner/i);
    expect(bannerImage).toBeInTheDocument();
  });

  test('renders footer with copyright text', () => {
    const footerText = screen.getByText(/© 2024 TechMart. All Rights Reserved./i);
    expect(footerText).toBeInTheDocument();
  });

  // You can add more tests based on specific functionalities
});
