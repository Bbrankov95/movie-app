import { render, screen, } from '@testing-library/react';
import App from './App';

test('renders App landing page', () => {
  render(<App />);
  const linkElement = screen.getByText(/your favourite movies in one place/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders serch btn', () => {
  render(<App />);
  const linkElement = screen.getByText(/search/i);
  expect(linkElement).toBeInTheDocument();
});

