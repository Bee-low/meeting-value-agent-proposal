import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';
const root = process.cwd();

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/index.html', `http://${request.headers.host || host}`);
  const requestPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const safePath = normalize(requestPath).replace(/^([.][.][/\\])+/, '');
  const filePath = join(root, safePath);

  try {
    const file = await readFile(filePath);
    const ext = extname(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(file);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, host, () => {
  console.log(`Meeting value proposal running at http://localhost:${port}`);
});