import express from 'express';
import path from 'path';
import compression from 'compression';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Enable gzip compression
app.use(compression());

// ── Cache-busting strategy ──────────────────────────────────────
// index.html is served with NO cache so the browser always gets
// the latest script references (Vite generates content-hashed filenames).
// Other static assets (JS/CSS/images) are cached aggressively since
// their filenames change when content changes.

// Serve index.html with NO cache
app.use((req, res, next) => {
  if (req.path === '/' || req.path === '/index.html') {
    return serveStatic(path.join(__dirname, 'dist'), {
      maxAge: 0,
      etag: true,
      lastModified: true,
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
    })(req, res, next);
  }
  next();
});

// Serve other static files (JS/CSS/images) with aggressive caching
app.use(serveStatic(path.join(__dirname, 'dist'), {
  maxAge: '30d',
  etag: true,
  lastModified: true,
  fallthrough: true
}));

// Handle SPA routing with explicit path handling
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Catch all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;

// Start server with error handling
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});