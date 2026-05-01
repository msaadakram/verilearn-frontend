const VERCEL_BACKEND_FALLBACK = 'https://verilearn-backend.vercel.app';
const LOCAL_BACKEND_FALLBACK = 'http://localhost:5000';

function debugApiLog(hypothesisId: string, location: string, message: string, data: Record<string, unknown>) {
  // #region agent log
  fetch('http://127.0.0.1:7840/ingest/308c3be9-68ac-4451-a0ea-ae9b1522c0d9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'4fe5b1'},body:JSON.stringify({sessionId:'4fe5b1',runId:'signup-debug-1',hypothesisId,location,message,data,timestamp:Date.now()})}).catch(()=>{});
  // #endregion
}

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, '');
}

export function getApiBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (fromEnv) {
    const normalizedFromEnv = normalizeBaseUrl(fromEnv);
    try {
      const parsedEnvUrl = new URL(normalizedFromEnv);
      const envHostname = parsedEnvUrl.hostname.toLowerCase();
      if (envHostname === 'verilearn-frontend.vercel.app') {
        debugApiLog('H11', 'config/api.ts:getApiBaseUrl', 'Detected frontend domain in NEXT_PUBLIC_API_BASE_URL; switching to backend fallback', {
          configuredBaseUrl: normalizedFromEnv,
          selectedBaseUrl: VERCEL_BACKEND_FALLBACK,
        });
        return VERCEL_BACKEND_FALLBACK;
      }
    } catch (_error) {
      // Ignore parse errors and continue using configured base URL.
    }

    debugApiLog('H1', 'config/api.ts:getApiBaseUrl', 'Using NEXT_PUBLIC_API_BASE_URL', {
      hasWindow: typeof window !== 'undefined',
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
      selectedBaseUrl: normalizedFromEnv,
    });
    return normalizedFromEnv;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      debugApiLog('H1', 'config/api.ts:getApiBaseUrl', 'Using local fallback backend URL', {
        hostname,
        selectedBaseUrl: LOCAL_BACKEND_FALLBACK,
      });
      return LOCAL_BACKEND_FALLBACK;
    }
  }

  debugApiLog('H1', 'config/api.ts:getApiBaseUrl', 'Using Vercel fallback backend URL', {
    hasWindow: typeof window !== 'undefined',
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
    selectedBaseUrl: VERCEL_BACKEND_FALLBACK,
  });
  return VERCEL_BACKEND_FALLBACK;
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
