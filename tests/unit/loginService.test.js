// /tests/unit/loginService.test.js

import nock from 'nock';
import { jest } from '@jest/globals';
import { loginUser } from "../../back-end/logic/loginService.js";

global.fetch = jest.fn(); // Mock fetch API (no real HTTP requests made)
const mockNavigate = jest.fn(); // Mock navigate() function from React Router
const mockSetError = jest.fn(); // Mock setError() state setter method

// Borrowed: https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  global.localStorage = new LocalStorageMock;


// Reset everything before every test
beforeEach(() => {
  fetch.mockClear();
  mockNavigate.mockClear();
  mockSetError.mockClear();
  localStorage.clear();
});


test('sets error when email or password is empty', async () => {
    await loginUser('', '', mockNavigate, mockSetError);  // Empty email and password
    expect(localStorage.getItem('token')).toBe(null);  // No token saved
    expect(mockNavigate).not.toHaveBeenCalled();    // No navigation
    expect(mockSetError).toHaveBeenCalledWith('Email and password are required');  // Expected error message
});


test('rejects password longer than 64 characters', async () => {
    const longPassword = 'A1' + 'a'.repeat(63); // 65 chars total
    await loginUser('user@example.com', longPassword, mockNavigate, mockSetError);
  
    expect(localStorage.getItem('token')).toBe(null);   // Token not stored
    expect(mockNavigate).not.toHaveBeenCalled();    // No redirect
    expect(mockSetError).toHaveBeenCalled();    // Error should be set
});


test('rejects password without uppercase letter', async () => {
    await loginUser('user@example.com', 'lowercase1', mockNavigate, mockSetError);
  
    expect(localStorage.getItem('token')).toBe(null);   // Token not stored
    expect(mockNavigate).not.toHaveBeenCalled();    // No redirect
    expect(mockSetError).toHaveBeenCalled();    // Error should be set
}); 
  
  
  test('rejects password without lowercase letter', async () => {
    await loginUser('user@example.com', 'UPPERCASE1', mockNavigate, mockSetError);
  
    expect(localStorage.getItem('token')).toBe(null);   // Token not stored
    expect(mockNavigate).not.toHaveBeenCalled();    // No redirect
    expect(mockSetError).toHaveBeenCalled();    // Error should be set
});
  
  
  test('rejects password without a number', async () => {
    await loginUser('user@example.com', 'PasswordNoNumber', mockNavigate, mockSetError);
  
    expect(localStorage.getItem('token')).toBe(null);   // Token not stored
    expect(mockNavigate).not.toHaveBeenCalled();    // No redirect
    expect(mockSetError).toHaveBeenCalled();    // Error should be set
});  


  test('rejects invalid email format', async () => {
    await loginUser('invalid-email', 'Password1', mockNavigate, mockSetError);
  
    expect(localStorage.getItem('token')).toBe(null);   // Token not stored
    expect(mockNavigate).not.toHaveBeenCalled();    // No redirect
    expect(mockSetError).toHaveBeenCalled();    // Error should be set
});  


  test('rejects empty password with valid email', async () => {
    await loginUser('user@example.com', '', mockNavigate, mockSetError);
  
    expect(localStorage.getItem('token')).toBe(null);   // Token not stored
    expect(mockNavigate).not.toHaveBeenCalled();    // Error should be set
    expect(mockSetError).toHaveBeenCalledWith('Email and password are required');
});  


test('stores token and navigates on successful login', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ token: 'abc123', id: 'user1' }),
  });

  await loginUser('user@example.com', 'password', mockNavigate, mockSetError);

  expect(localStorage.getItem('token')).toBe('abc123'); // Token was stored
  expect(mockNavigate).toHaveBeenCalledWith('/dashboard');  // User was redirected
  expect(mockSetError).not.toHaveBeenCalled();  // No error set
});


test('sets error message when login fails with a message', async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ message: 'Invalid credentials' }),
  });

  await loginUser('user@example.com', 'wrongpassword', mockNavigate, mockSetError);

  expect(localStorage.getItem('token')).toBe(null);   // Token not stored
  expect(mockNavigate).not.toHaveBeenCalled();  // No redirect
  expect(mockSetError).toHaveBeenCalledWith('Invalid credentials');
});


test('sets default error message when login fails with no message', async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({}),
  });

  await loginUser('user@example.com', 'wrongpassword', mockNavigate, mockSetError);

  expect(mockSetError).toHaveBeenCalledWith('Login failed');
});


test('sets error message when network error occurs', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'));
  
    await loginUser('user@example.com', 'password', mockNavigate, mockSetError);
  
    expect(localStorage.getItem('token')).toBe(null);   // Token not stored
    expect(mockNavigate).not.toHaveBeenCalled();    // No redirect
    expect(mockSetError).toHaveBeenCalledWith('Network Error');
});


test('sets error message when server returns a 500 error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Internal server error' }),
    });
  
    await loginUser('user@example.com', 'password', mockNavigate, mockSetError);
  
    expect(localStorage.getItem('token')).toBe(null);   // Token not stored
    expect(mockNavigate).not.toHaveBeenCalled();    // No redirect
    expect(mockSetError).toHaveBeenCalledWith('Internal server error');
});


test('handles login attempt with special characters in email', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'abc123', id: 'user1' }),
    });
  
    await loginUser('user+test@example.com', 'password', mockNavigate, mockSetError);
  
    expect(localStorage.getItem('token')).toBe('abc123');   // Token should be stored
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');    // Redirect to dashboard
    expect(mockSetError).not.toHaveBeenCalled();    // No error message
});


test('handles unexpected data structure from server', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ unexpectedField: 'some data' }), // Missing token and id
    });
  
    await loginUser('user@example.com', 'password', mockNavigate, mockSetError);
  
    expect(localStorage.getItem('token')).toBe(null);   // Token not stored
    expect(mockNavigate).not.toHaveBeenCalled();    // No redirect
    expect(mockSetError).toHaveBeenCalledWith('Login failed');
});  


afterAll(() => {
    nock.cleanAll();
    nock.restore();
});  