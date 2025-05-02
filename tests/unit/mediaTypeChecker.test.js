import { determineMediaType } from '../../back-end/logic/mediaTypeChecker.js';

describe('determineMediaType', () => {

  describe('Positive test cases (realistic inputs)', () => {
    test('returns "image" for image/png', () => {
      expect(determineMediaType('image/png')).toBe('image');
    });

    test('returns "audio" for audio/mpeg', () => {
      expect(determineMediaType('audio/mpeg')).toBe('audio');
    });

    test('returns "video" for video/mp4', () => {
      expect(determineMediaType('video/mp4')).toBe('video');
    });
  });

  describe('Case normalization (boundary usability)', () => {
    test('returns "image" for IMAGE/PNG', () => {
      expect(determineMediaType('IMAGE/PNG')).toBe('image');
    });

    test('returns "audio" for AUDIO/MPEG', () => {
      expect(determineMediaType('AUDIO/MPEG')).toBe('audio');
    });
  });

  describe('Edge cases (missing or weak MIME types)', () => {
    test('returns "text" for unknown mimetype like application/json', () => {
      expect(determineMediaType('application/json')).toBe('text');
    });

    test('returns "text" for empty string', () => {
      expect(determineMediaType('')).toBe('text');
    });

    test('returns "text" for undefined input', () => {
      expect(determineMediaType(undefined)).toBe('text');
    });

    test('returns "text" for null input', () => {
      expect(determineMediaType(null)).toBe('text');
    });

    test('returns "text" for numeric input', () => {
      expect(determineMediaType(123)).toBe('text');
    });
  });

  describe('Negative cases (invalid or malformed input)', () => {
    test('returns "text" for completely invalid string', () => {
      expect(determineMediaType('not/a-real-type')).toBe('text');
    });

    test('returns "text" for a string without a slash', () => {
      expect(determineMediaType('randomstring')).toBe('text');
    });

    test('returns "text" for boolean true', () => {
      expect(determineMediaType(true)).toBe('text');
    });

    test('returns "text" for an object input', () => {
      expect(determineMediaType({ type: 'image/png' })).toBe('text');
    });

    test('returns "text" for an array input', () => {
      expect(determineMediaType(['image/png'])).toBe('text');
    });

    test('returns "text" for a function input', () => {
      expect(determineMediaType(() => 'image/png')).toBe('text');
    });
  });

});