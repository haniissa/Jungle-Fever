import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getRequestListener } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { createCafeApp } from './src/server/app';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT ?? 3000);

async function startServer() {
  const app = createCafeApp();

  if (isProduction) {
    app.use('/assets/*', serveStatic({ root: './dist' }));
    app.use('/src/assets/*', serveStatic({ root: './dist' }));
    app.get('*', (c) => {
      const indexPath = path.resolve(__dirname, 'dist', 'index.html');
      const html = fs.readFileSync(indexPath, 'utf-8');
      return c.html(html);
    });

    const listener = getRequestListener(app.fetch);
    const server = createServer(listener);
    server.listen(port, '0.0.0.0', () => {
      console.log(`Jungle Fever Hono server listening on http://0.0.0.0:${port}`);
    });
    return;
  }

  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  const honoListener = getRequestListener(app.fetch);
  const server = createServer((req, res) => {
    if (req.url?.startsWith('/api/')) {
      void honoListener(req, res);
      return;
    }
    vite.middlewares(req, res, () => {
      void honoListener(req, res);
    });
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`Jungle Fever Hono + Vite dev server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Hono server:', err);
  process.exit(1);
});
