
// Function to determine a mediatype on uploaded files
export function determineMediaType(mimetype) {
    if (typeof mimetype !== 'string') return 'text';
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('audio/')) return 'audio';
    if (mimetype.startsWith('video/')) return 'video';
    return 'text';
  }