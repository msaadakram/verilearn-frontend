const VERCEL_BACKEND_FALLBACK = 'https://verilearn-backend.vercel.app';
const LOCAL_BACKEND_FALLBACK = 'http://localhost:5000';

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, '');
}

export function getApiBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (fromEnv) {
    return normalizeBaseUrl(fromEnv);
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return LOCAL_BACKEND_FALLBACK;
    }
  }

  return VERCEL_BACKEND_FALLBACK;
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
