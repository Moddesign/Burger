const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const mimeTypes = {
'.html': 'text/html',
'.js': 'application/javascript',
'.css': 'text/css',
'.json': 'application/json',
'.png': 'image/png',
'.jpg': 'image/jpeg',
'.svg': 'image/svg+xml',
};

http.createServer((req, res) => {
console.log(`${req.method} ${req.url}`);

// Standard-Route: index.html, wenn Root angefragt wird
let filePath = req.url === '/' ? '/index.html' : req.url;

// Sicherheit: Pfad bereinigen, keine Pfad-Traversierung erlauben
filePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');

const fullPath = path.join(PUBLIC_DIR, filePath);

fs.stat(fullPath, (err, stats) => {
if (err || !stats.isFile()) {
res.statusCode = 404;
res.end('404 Not Found');
return;
}

const ext = path.extname(fullPath);
const mimeType = mimeTypes[ext] || 'application/octet-stream';

res.writeHead(200, { 'Content-Type': mimeType });

const stream = fs.createReadStream(fullPath);
stream.pipe(res);
});

}).listen(PORT, () => {
console.log(`Server läuft unter http://localhost:${PORT}`);
});
