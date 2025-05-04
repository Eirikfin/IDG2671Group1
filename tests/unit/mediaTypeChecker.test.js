// /tests/unit/mediaTypeChecker.test.js

// Import isolated function
import { determineMediaType } from '../../back-end/logic/mediaTypeChecker.js';

describe('determineMediaType', () => {

  //  Positive cases
  describe('Positive test cases (realistic inputs)', () => {
    // Test if function identifies correct image MIME types
    test('returns "image" for image/png', () => {
      expect(determineMediaType('image/png')).toBe('image');
    });

    // Test if function identifies correct audio MIME type
    test('returns "audio" for audio/mpeg', () => {
      expect(determineMediaType('audio/mpeg')).toBe('audio');
    });

    // Test if function identifies correct video MIME type
    test('returns "video" for video/mp4', () => {
      expect(determineMediaType('video/mp4')).toBe('video');
    });
  });

  // Testing case insensitivity for filetypes
  describe('Case normalization (boundary usability)', () => {
    // Function should return image if image MIME type is uppercase
    test('returns "image" for IMAGE/PNG', () => {
      expect(determineMediaType('IMAGE/PNG')).toBe('image');
    });

    // Function should return audio if audio MIME type is uppercase
    test('returns "audio" for AUDIO/MPEG', () => {
      expect(determineMediaType('AUDIO/MPEG')).toBe('audio');
    });
  });

  // Edge cases for unknown or weak MIME types
  describe('Edge cases (missing or weak MIME types)', () => {
    // "text" should be returned for unsupported but valid MIME type
    test('returns "text" for unknown mimetype like application/json', () => {
      expect(determineMediaType('application/json')).toBe('text');
    });

    // "text" should be returned if input is empty string
    test('returns "text" for empty string', () => {
      expect(determineMediaType('')).toBe('text');
    });

    // "text" should be returned if input is undefined
    test('returns "text" for undefined input', () => {
      expect(determineMediaType(undefined)).toBe('text');
    });

    // "text" should be returned if null input
    test('returns "text" for null input', () => {
      expect(determineMediaType(null)).toBe('text');
    });

    // "text" should be returned if input is numeric
    test('returns "text" for numeric input', () => {
      expect(determineMediaType(123)).toBe('text');
    });
  });

  //  Negative cases
  describe('Negative cases (invalid or malformed input)', () => {
    // Return "text" for non-existent MIME type
    test('returns "text" for completely invalid string', () => {
      expect(determineMediaType('not/a-real-type')).toBe('text');
    });

    // Return "text" for string without a slash (i.e., not a MIME type)
    test('returns "text" for a string without a slash', () => {
      expect(determineMediaType('randomstring')).toBe('text');
    });

    // Return "text" for boolean input
    test('returns "text" for boolean true', () => {
      expect(determineMediaType(true)).toBe('text');
    });

    // Return "text" for object input
    test('returns "text" for an object input', () => {
      expect(determineMediaType({ type: 'image/png' })).toBe('text');
    });

    // Return "text" for array input
    test('returns "text" for an array input', () => {
      expect(determineMediaType(['image/png'])).toBe('text');
    });

    // Retuyrn "text" for function input
    test('returns "text" for a function input', () => {
      expect(determineMediaType(() => 'image/png')).toBe('text');
    });
  });
});