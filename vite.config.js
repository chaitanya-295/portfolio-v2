import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function projectsApiPlugin() {
  return {
    name: 'projects-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        let filePath = '';
        if (req.url === '/api/projects') {
          filePath = path.join(__dirname, 'src/data/projects.json');
        } else if (req.url === '/api/services') {
          filePath = path.join(__dirname, 'src/data/services.json');
        } else if (req.url === '/api/skills') {
          filePath = path.join(__dirname, 'src/data/skills.json');
        } else if (req.url === '/api/profile') {
          filePath = path.join(__dirname, 'src/data/profile.json');
        }
        
        if (filePath) {
          if (req.method === 'GET') {
            try {
              if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
              } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'File not found' }));
              }
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }
          
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
              } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON or write error: ' + err.message }));
              }
            });
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), projectsApiPlugin()],
})
