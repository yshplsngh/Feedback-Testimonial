import { rateLimit } from 'express-rate-limit';

const rateLimitMiddleware = rateLimit({
  windowMs: 1000 * 40, // 40 sec
  limit: 100,
  message: {
    message:
      'Too many request from this IP, please try again after a 60 second pause',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default rateLimitMiddleware;
