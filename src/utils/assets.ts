/**
 * Safely resolves asset paths for both local development and subpath deployments like GitHub Pages.
 */
export const asset = (path: string): string => {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || './';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
};
