// A simple in-memory rate limiter.
// In a production environment, you would use a more robust solution like Redis.

type RateLimiterStore = {
  [key: string]: {
    count: number;
    expiry: number;
  };
};

const store: RateLimiterStore = {};
const windowMs = 60 * 1000; // 1 minute
const maxRequests = 5;

export const rateLimiter = (key: string) => {
  const now = Date.now();
  const record = store[key];

  if (!record || record.expiry < now) {
    // If record doesn't exist or has expired, create a new one
    store[key] = {
      count: 1,
      expiry: now + windowMs,
    };
    return true; // Allow the request
  }

  if (record.count < maxRequests) {
    // If within limit, increment count and allow
    record.count++;
    return true;
  }

  // If over the limit, deny
  return false;
};
