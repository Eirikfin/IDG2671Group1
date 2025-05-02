// /tests/unit/loginService.test.js

import { jest } from '@jest/globals';
import { loginUser } from "../../back-end/logic/loginService.js";

// --- Mocks & setup ---
global.fetch = jest.fn();
const mockNavigate = jest.fn();
const mockSetError = jest.fn();

class LocalStorageMock {
  constructor() { this.store = {}; }
  clear() { this.store = {}; }
  getItem(k) { return this.store[k] || null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
}
global.localStorage = new LocalStorageMock();

beforeEach(() => {
  fetch.mockClear();
  mockNavigate.mockClear();
  mockSetError.mockClear();
  localStorage.clear();
});

// --- Positive test cases: successful login ---
describe('Positive Test Cases: Successful Login', () => {
  test('should store token and navigate on 200 OK with token', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'abc123', id: 'user1' }),
    });

    await loginUser('user@example.com', 'ValidPass1', mockNavigate, mockSetError);

    expect(localStorage.getItem('token')).toBe('abc123');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    expect(mockSetError).not.toHaveBeenCalled();
  });
});

// --- Boundary / edge cases for inputs ---
describe('Boundary / Edge Test Cases for Inputs', () => {
  test('should early-return if email or password is empty', async () => {
    await loginUser('', '', mockNavigate, mockSetError);
    expect(mockSetError).toHaveBeenCalledWith('Email and password are required');
    expect(fetch).not.toHaveBeenCalled();
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('should handle null email and return early', async () => {
    await loginUser(null, 'somePassword', mockNavigate, mockSetError);
    expect(mockSetError).toHaveBeenCalledWith('Email and password are required');
    expect(fetch).not.toHaveBeenCalled();
  });

  test('should handle undefined password and return early', async () => {
    await loginUser('user@example.com', undefined, mockNavigate, mockSetError);
    expect(mockSetError).toHaveBeenCalledWith('Email and password are required');
    expect(fetch).not.toHaveBeenCalled();
  });
});

// --- Edge cases: Token handling ---
describe('Edge Cases: Token Handling', () => {
  test('should treat token = null as login failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: null, id: 'user1' }),
    });

    await loginUser('user@example.com', 'ValidPass1', mockNavigate, mockSetError);

    expect(localStorage.getItem('token')).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetError).toHaveBeenCalledWith('Login failed');
  });

  test('should treat token = empty string as login failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: '', id: 'user1' }),
    });

    await loginUser('user@example.com', 'ValidPass1', mockNavigate, mockSetError);

    expect(localStorage.getItem('token')).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetError).toHaveBeenCalledWith('Login failed');
  });
});

// --- Negative test cases: Error handling ---
describe('Negative Test Cases: Error Handling', () => {
  test('should set server-provided error message on non-ok response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    });

    await loginUser('user@example.com', 'wrongpass', mockNavigate, mockSetError);

    expect(mockSetError).toHaveBeenCalledWith('Invalid credentials');
  });

  test('should use default message if server error has no message field', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await loginUser('user@example.com', 'wrongpass', mockNavigate, mockSetError);
    expect(mockSetError).toHaveBeenCalledWith('Login failed');
  });

  test('should catch network errors and return appropriate message', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'));
    await loginUser('user@example.com', 'ValidPass1', mockNavigate, mockSetError);

    expect(mockSetError).toHaveBeenCalledWith('Network Error');
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});