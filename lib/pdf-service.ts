/**
 * Service for handling PDF-related operations
 */

/**
 * Transforms a Google Drive URL into a direct download link
 * @param url The Google Drive URL
 * @returns The transformed URL for direct download
 */
export function transformGoogleDriveUrl(url: string): string {
  if (!url) return '';

  try {
    // Handle Google Drive URLs
    if (url.includes('drive.google.com')) {
      // Extract the file ID from various Google Drive URL formats
      let fileId = '';
      
      if (url.includes('/file/d/')) {
        // Format: https://drive.google.com/file/d/[fileId]/view
        fileId = url.split('/file/d/')[1].split('/')[0];
      } else if (url.includes('id=')) {
        // Format: https://drive.google.com/open?id=[fileId]
        fileId = new URL(url).searchParams.get('id') || '';
      }

      if (fileId) {
        // Return the direct download URL
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
    }

    return url;
  } catch (error) {
    console.error('Error transforming Google Drive URL:', error);
    return url;
  }
}

/**
 * Validates if the given URL is a valid Google Drive link
 * @param url The URL to validate
 * @returns True if the URL is a valid Google Drive link
 */
export function isValidGoogleDriveUrl(url: string): boolean {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'drive.google.com';
  } catch {
    return false;
  }
}
