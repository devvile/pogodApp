import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function serializeState(state) {
  return JSON.stringify(state).replace(/</g, '\\u003c');
}

// Function to select port based on environment
function getPort() {
  return process.env.NODE_ENV === 'production' ? 5000 : 5173;
}

async function createServer() {
  try {
    const app = express();
    console.log('Creating Vite server...');

    // Configure CORS
    const corsOptions = {
      origin: true, // Allow all origins in development
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    };

    // Apply CORS middleware
    app.use(cors(corsOptions));

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    console.log('Vite server created successfully');

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;

      if (
        url.includes('.well-known') ||
        url.includes('favicon.ico') ||
        url.includes('manifest.json') ||
        url.startsWith('/api/') ||
        url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
      ) {
        return next();
      }

      console.log(`\n🔍 Processing SSR request: ${url}`);

      try {
        const indexPath = path.resolve(__dirname, 'index.html');

        if (!fs.existsSync(indexPath)) {
          throw new Error(`index.html not found at ${indexPath}`);
        }

        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);

        const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
        const { html: appHtml, preloadedState } = await render(url);

        const serializedState = serializeState(preloadedState);

        const stateScript = `
          <script>
            window.__PRELOADED_STATE__ = ${serializedState};
          </script>
        `;

        const html = template.replace(`<!--ssr-outlet-->`, appHtml + stateScript);

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        console.error('❌ Error processing request:', e);
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });

    const port = getPort();
    const server = app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
      console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    server.on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to create server:', error);
    process.exit(1);
  }
}

createServer().catch((err) => {
  console.error('Unhandled error during server creation:', err);
  process.exit(1);
});