/**
 * API Health Check Route
 * 
 * This endpoint provides a simple health check for the Next.js API.
 */

export default function handler(req, res) {
  res.status(200).json({ 
    status: 'ok', 
    message: 'LitSpark Brand Solutions Next.js API is running',
    timestamp: new Date().toISOString()
  });
}
