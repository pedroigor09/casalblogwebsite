export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/casalblogwebsite' : '';
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${basePath}/${cleanPath}`;
}

export function getImagePath(filename: string): string {
  return getAssetPath(filename);
}

export function getVideoPath(filename: string): string {
  return getAssetPath(filename);
}
