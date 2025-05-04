// /tests/unit/loginService.test.js

import { jest } from '@jest/globals';

// Import isolated function
import { loginUser } from "../../back-end/logic/loginService.js";

// Mocks
global.fetch = jest.fn(); // Mock fetch API
const mockNavigate = jest.fn(); // Mock navigation function
const mockSetError = jest.fn(); // Mock setError to set error messages

// Mock localStorage (important for token handling)
class LocalStorageMock {
  constructor() { this.store = {}; } // Internal object mimicking key-value storage
  clear() { this.store = {}; } // Clear items in localStorage
  getItem(k) { return this.store[k] || null; } // Return key value, return null if not found
  setItem(k, v) { this.store[k] = String(v); } // Save stringified value under key K
  removeItem(k) { delete this.store[k]; } // Remove K key from storage
}
global.localStorage = new LocalStorageMock(); // Replace localStorage object with mock localStorage

/*  Clear mocks before each test 
    (prevents compounding fetch calls, key-value pairs in mock localStorage etc...) */
beforeEach(() => {
  fetch.mockClear();
  mockNavigate.mockClear();
  mockSetError.mockClear();
  localStorage.clear();
});

// Positive cases
describe('Positive Test Cases: Successful Login', () => {
  test('should store token and navigate on 200 OK with token', async () => {
    // Mock successful fetch response with valid token
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'abc123', id: 'user1' }),
    });

    await loginUser('user@example.com', 'ValidPass1', mockNavigate, mockSetError);
    // Expect token to be stored in localStorage
    expect(localStorage.getItem('token')).toBe('abc123');
    // Expect navigating to application dashboard
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    // Expect no error set
    expect(mockSetError).not.toHaveBeenCalled();
  });
});

// Boundary/edge cases
describe('Boundary/Edge Test Cases for Inputs', () => {
  test('should early-return if email or password is empty', async () => {
    // No email/password
    await loginUser('', '', mockNavigate, mockSetError);
    
    // Expect error message about missing input in required form fields
    expect(mockSetError).toHaveBeenCalledWith('Email and password are required');
    // Expect no API call
    expect(fetch).not.toHaveBeenCalled();
    // Expect no token storage
    expect(localStorage.getItem('token')).toBeNull();
    // Expect no automatic navigation
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('should handle null email and return early', async () => {
    // No email provided (null)
    await loginUser(null, 'somePassword', mockNavigate, mockSetError);

    // Expect error message about missing input in required form fields
    expect(mockSetError).toHaveBeenCalledWith('Email and password are required');
    // Expect no API call
    expect(fetch).not.toHaveBeenCalled();
  });

  test('should handle undefined password and return early', async () => {
    // No password provided
    await loginUser('user@example.com', undefined, mockNavigate, mockSetError);

    // Expect error message about missing input in required form fields
    expect(mockSetError).toHaveBeenCalledWith('Email and password are required');
    // Expect no API call
    expect(fetch).not.toHaveBeenCalled();
  });
});

// Edge cases
describe('Edge Cases: Token Handling', () => {
  test('should treat token = null as login failure', async () => {
    // Server returns null token
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: null, id: 'user1' }),
    });

    await loginUser('user@example.com', 'ValidPass1', mockNavigate, mockSetError);

    // Expect no token storage
    expect(localStorage.getItem('token')).toBeNull();
    // Expect no automatic navigation
    expect(mockNavigate).not.toHaveBeenCalled();
    // Expect login error message
    expect(mockSetError).toHaveBeenCalledWith('Login failed');
  });

  test('should treat token = empty string as login failure', async () => {
    // Token is an empty string
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: '', id: 'user1' }),
    });

    await loginUser('user@example.com', 'ValidPass1', mockNavigate, mockSetError);

    // Expect no token storage
    expect(localStorage.getItem('token')).toBeNull();
    // Expect no automatic navigation
    expect(mockNavigate).not.toHaveBeenCalled();
    // Expect login error message
    expect(mockSetError).toHaveBeenCalledWith('Login failed');
  });
});

//  Negative cases (server or network error)
describe('Negative Test Cases: Error Handling', () => {
  test('should set server-provided error message on non-ok response', async () => {
    // Server responds with error message
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    });

    await loginUser('user@example.com', 'wrongpass', mockNavigate, mockSetError);

    // Expect server-side error message
    expect(mockSetError).toHaveBeenCalledWith('Invalid credentials');
  });

  test('should use default message if server error has no message field', async () => {
    // Server has no error message for error
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await loginUser('user@example.com', 'wrongpass', mockNavigate, mockSetError);

    // Expect default server error message 
    expect(mockSetError).toHaveBeenCalledWith('Login failed');
  });

  test('should catch network errors and return appropriate message', async () => {
    // Network error (e.g., faulty connection)
    fetch.mockRejectedValueOnce(new Error('Network Error'));
    await loginUser('user@example.com', 'ValidPass1', mockNavigate, mockSetError);

    // Expect network error message
    expect(mockSetError).toHaveBeenCalledWith('Network Error');
    // Expect no token storage
    expect(localStorage.getItem('token')).toBeNull();
    // Expect no automatic navigation
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});