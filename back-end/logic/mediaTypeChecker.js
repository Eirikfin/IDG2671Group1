// Function to determine a mediatype on uploaded files

export function determineMediaType(mimeType) {
  if (typeof mimeType !== 'string') return 'text';

  const normalized = mimeType.toLowerCase();

  if (normalized.startsWith('image/')) return 'image';
  if (normalized.startsWith('audio/')) return 'audio';
  if (normalized.startsWith('video/')) return 'video';

  return 'text';
}