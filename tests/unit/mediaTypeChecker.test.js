// /tests/unit/mediaTypeHelper.test.js

import { determineMediaType } from '../../back-end/mediaTypeHelper.js';

describe('determineMediaType', () => {
  test('returns "image" for image/png', () => {
    expect(determineMediaType('image/png')).toBe('image');
  });

  test('returns "audio" for audio/mpeg', () => {
    expect(determineMediaType('audio/mpeg')).toBe('audio');
  });

  test('returns "video" for video/mp4', () => {
    expect(determineMediaType('video/mp4')).toBe('video');
  });

  test('returns "text" for unknown mimetype', () => {
    expect(determineMediaType('application/json')).toBe('text');
  });

  test('returns "text" for empty string', () => {
    expect(determineMediaType('')).toBe('text');
  });

  test('returns "text" for undefined input', () => {
    expect(determineMediaType(undefined)).toBe('text');
  });
});
