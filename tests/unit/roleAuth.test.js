// /tests/unit/roleAuth.test.js

import { jest } from '@jest/globals';
import { requireAdmin } from '../../back-end/logic/roleAuth.js';

describe('requireAdmin middleware', () => {
  
  let req, res, next;
  
  beforeEach(() => {
    req = { user: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
  
  // Positive cases
  describe('Positive test cases (realistic valid input)', () => {
    test('should allow access when user role is exactly "admin"', () => {
      req.user.role = 'admin';
      requireAdmin(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  // Boundary cases
  describe('Boundary test cases (case-sensitive role matching)', () => {
    test('should deny access when role is "Admin" (capitalized)', () => {
      req.user.role = 'Admin';
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });
    
    test('should deny access when role is "ADMIN" (all caps)', () => {
      req.user.role = 'ADMIN';
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });
  });

  // Edge cases
  describe('Edge test cases (unusual but technically valid values)', () => {
    test('should deny access when role is an empty string', () => {
      req.user.role = '';
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });

    test('should deny access when role is a number (e.g., 0)', () => {
      req.user.role = 0;
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });

    test('should deny access when role is null', () => {
      req.user.role = null;
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });
  });

  // Negative cases
  describe('Negative test cases (invalid or missing input)', () => {
    test('should deny access when user object is missing entirely', () => {
      req = {};
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });

    test('should deny access when user object is empty', () => {
      req.user = {};
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });

    test('should deny access when req is null', () => {
      req = null;
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });

    test('should deny access when req is undefined', () => {
      req = undefined;
      requireAdmin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Administrator privileges required to perform this operation." });
    });
  });
});