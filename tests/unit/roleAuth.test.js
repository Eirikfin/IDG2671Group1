// /tests/unit/roleAuth.test.js

import { jest } from '@jest/globals';

// Import isolated function
import { requireAdmin } from '../../back-end/logic/roleAuth.js';

describe('requireAdmin middleware', () => {
  
  let req, res, next;
  
  // Reset mocks and req/res objects before every test
  beforeEach(() => {
    // Create fresh mock req object with answer user object (user {})
    req = { user: {} };
    // Mock response object
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    /* 
      Mock next() function (important to verify if middleware passes control to next handler) 
    */
    next = jest.fn();
  });
  
  // Positive cases
  describe('Positive test cases (realistic valid input)', () => {
    // Call next() if user role value matches the exact string "admin"
    // Role extracted from user object (user { ... role:'admin' })
    test('should allow access when user role is exactly "admin"', () => {
      req.user.role = 'admin';
      requireAdmin(req, res, next);

      // Expect granted access
      expect(next).toHaveBeenCalled();
    });
  });

  // Boundary cases (case sensitivity for role)
  describe('Boundary test cases (case-sensitive role matching)', () => {
    /* 
      Reject if role has capitalized A in "Admin",
      Though function should reject no matter which letter is capitalized...
    */
    test('should deny access when role is "Admin" (capitalized)', () => {
      req.user.role = 'Admin';
      requireAdmin(req, res, next);

      // Expect 403 response (forbidden)
      expect(res.status).toHaveBeenCalledWith(403);
      // Expect JSON response with error message
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });
    
    // Reject if role is uppercased
    test('should deny access when role is "ADMIN" (all caps)', () => {
      req.user.role = 'ADMIN';
      requireAdmin(req, res, next);

      // Expect 403 reponse (forbidden)
      expect(res.status).toHaveBeenCalledWith(403);
      // Expect JSON response with error message
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });
  });

  // Edge cases
  describe('Edge test cases (unusual but technically valid values)', () => {
    // Deny access if role is an empty string
    test('should deny access when role is an empty string', () => {
      req.user.role = '';
      requireAdmin(req, res, next);

      // Expect 403 forbidden response
      expect(res.status).toHaveBeenCalledWith(403);
      // Expect JSON response with error message
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });

    // Deny access if role is numeric (e.g., role = 3)
    test('should deny access when role is a number (e.g., 0)', () => {
      req.user.role = 0;
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });

    // Deny access if role is null
    test('should deny access when role is null', () => {
      req.user.role = null;
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });
  });

  // Negative cases
  describe('Negative test cases (invalid or missing input)', () => {
    // Deny access if user object is missing (doesn't exist -> user { id:'123', name:'something', role:'admin' })
    test('should deny access when user object is missing entirely', () => {
      req = {};
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });

    // Deny access if user object is empty (e.g., user {})
    test('should deny access when user object is empty', () => {
      req.user = {};
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });

    // Deny access if req = null
    test('should deny access when req is null', () => {
      req = null;
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });

    // Deny access if req = undefined
    test('should deny access when req is undefined', () => {
      req = undefined;
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });
  });
});