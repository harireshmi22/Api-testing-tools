
// Build allowed origins list; include optional FRONTEND_URL env value
const defaultOrigins = [
    'http://localhost:3000',        // Local development
    'http://localhost:3001',        // Local frontend (added)
    'http://localhost:3002',        // Local frontend (added)
    'http://localhost:3003',        // Local frontend (added)
    'https://yourdomain.com',       // Production domain
    'https://www.yourdomain.com'    // Production domain with www
];

const envFrontend = process.env.FRONTEND_URL;
const allowedOrigins = Array.from(new Set([
    ...defaultOrigins,
    ...(envFrontend ? [envFrontend] : [])
]));

const corsOptions = {
    origin: function (origin, callback) {
        // Log incoming origin for debugging (will show `undefined` for same-origin or non-browser requests)
        console.log('[CORS] incoming Origin:', origin, ' NODE_ENV:', process.env.NODE_ENV);

        // Allow requests with no origin (mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);

        // In development, allow localhost origins on any port (e.g. http://localhost:3001)
        if (process.env.NODE_ENV === 'development') {
            try {
                const url = new URL(origin);
                const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
                if (isLocalhost) {
                    console.warn('[CORS] development mode - allowing localhost origin:', origin);
                    return callback(null, true);
                }
            } catch {
                // If origin isn't a valid URL, fall through to whitelist check and log
                console.warn('[CORS] invalid origin format in development:', origin);
            }
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn('[CORS] blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

export { corsOptions };

