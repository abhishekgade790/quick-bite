import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '../Contact';

describe('Contact Component', () => {

  // 1. Ensure the Contact component renders without crashing
  test('renders contact component correctly', () => {
    render(<Contact />);

    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Send Us a Message')).toBeInTheDocument();
  });

  // 2. Check if contact information is displayed
  test('displays contact information', () => {
    render(<Contact />);

    expect(screen.getByText('+91 1234567890')).toBeInTheDocument();
    expect(screen.getByText('support@fooddelivery.com')).toBeInTheDocument();
    expect(screen.getByText('Mumbai, India')).toBeInTheDocument();
  });

  // 3. Verify form input placeholders
  test('renders input fields with correct placeholders', () => {
    render(<Contact />);

    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
  });

  // 4. Ensure form fields are editable
  test('allows input in form fields', () => {
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');
    const messageInput = screen.getByPlaceholderText('Your Message');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput.value).toBe('john@example.com');

    fireEvent.change(messageInput, { target: { value: 'Hello there!' } });
    expect(messageInput.value).toBe('Hello there!');
  });

  // 5. Verify the "Send Message" button exists
  test('renders submit button', () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    expect(submitButton).toBeInTheDocument();
  });


});
