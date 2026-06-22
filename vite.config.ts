import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';

/**
 * Dev-only endpoint so the level editor can write a map straight back to
 * public/world/<id>.json while running `npm run dev`. Ignored in production
 * builds (the editor falls back to file download / clipboard on githack).
 */
function editorSavePlugin(): Plugin {
  return {
    name: 'ohmfront-editor-save',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__save_map', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end('POST only'); return; }
        const url = new URL(req.url ?? '', 'http://localhost');
        const id = url.searchParams.get('id') ?? '';
        if (!/^[a-z0-9-]+$/.test(id)) { res.statusCode = 400; res.end('bad id'); return; }
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', async () => {
          try {
            JSON.parse(body); // validate it's real JSON before writing
            await writeFile(resolve(__dirname, 'public/world', `${id}.json`), body);
            res.statusCode = 200; res.end('ok');
          } catch (e) {
            res.statusCode = 500; res.end(String(e));
          }
        });
      });
    },
  };
}

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        editor: resolve(__dirname, 'editor.html'),
        slicer: resolve(__dirname, 'slicer.html'),
      },
    },
  },
  server: { host: true },
  plugins: [editorSavePlugin()],
});
