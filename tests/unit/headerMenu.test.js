// /tests/unit/headerMenu.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../front-end/src/components/user-interface/header/ui_header.jsx';

const getMenu = () => screen.getByTestId('dropdown-menu');

test('menu is closed on initial render', () => {
  render(<Header />);
  const menu = getMenu();
  expect(menu.className).not.toMatch(/open/);
});

test('clicking menu button toggles menu open', () => {
  render(<Header />);
  const button = screen.getByText(/menu/i);
  fireEvent.click(button);
  const menu = getMenu();
  expect(menu.className).toMatch(/open/);
});

test('clicking outside closes the menu', () => {
  render(<Header />);
  const button = screen.getByText(/menu/i);
  fireEvent.click(button); // open menu

  // Simulate clicking outside the component
  const outside = document.createElement('div');
  document.body.appendChild(outside);
  fireEvent.click(outside);

  const menu = getMenu();
  expect(menu.className).not.toMatch(/open/);
});

test('clicking inside the menu does not close it', () => {
  render(<Header />);
  const button = screen.getByText(/menu/i);
  fireEvent.click(button); // open menu

  const profileLink = screen.getByText(/profile/i);
  fireEvent.click(profileLink);
  const menu = getMenu();
  expect(menu.className).toMatch(/open/);
});

test('renders all expected links', () => {
  render(<Header />);
  expect(screen.getByText(/profile/i)).toBeInTheDocument();
  expect(screen.getByText(/manage database/i)).toBeInTheDocument();
  expect(screen.getByText(/results/i)).toBeInTheDocument();
});