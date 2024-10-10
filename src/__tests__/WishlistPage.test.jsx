import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import WishlistPage from '../pages/WishlistPage';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('WishlistPage', () => {
  beforeEach(() => {
    renderWithRouter(<WishlistPage />);
  });

  test('renders header', () => {
    const headerText = screen.getByText(/my wishlist/i);
    expect(headerText).toBeInTheDocument();
  });

  test('renders wishlist items', () => {
    const items = [
      'Apple iPhone 14, 128GB, Blue',
      'Nintendo Switch Pro Wireless Game Controller - Black',
    ];

    items.forEach((item) => {
      const itemElement = screen.getByText(item);
      expect(itemElement).toBeInTheDocument();
    });
  });

  test('renders correct prices for wishlist items', () => {
    expect(screen.getByText('$999.00')).toBeInTheDocument();
    expect(screen.getByText('$70.00')).toBeInTheDocument();
  });

  test('renders stock status for wishlist items', () => {
    expect(screen.getByText(/in stock/i)).toBeInTheDocument();
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
  });

  test('Add to cart button functionality', () => {
    const addToCartButtons = screen.getAllByText(/add to cart/i);
    const inStockButton = addToCartButtons[0]; 
    expect(inStockButton).toBeInTheDocument();
    
    fireEvent.click(inStockButton);
  });
  
  test('Add to cart button is disabled for out-of-stock item', () => {
    const addToCartButtons = screen.getAllByText(/add to cart/i);
    const outOfStockButton = addToCartButtons[1]; 
    expect(outOfStockButton).toBeInTheDocument();

    expect(outOfStockButton).toHaveStyle('cursor: not-allowed');
    expect(outOfStockButton).toHaveStyle('background-color: rgb(136, 136, 136)'); 
  });
});

