const fs = require('fs');
const path = require('path');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    let filePath = './public' + (req.url === '/' ? '/index.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js':   'text/javascript',
        '.css':  'text/css',
        '.json': 'application/json',
        '.png':  'image/png',
        '.jpg':  'image/jpg',
        '.gif':  'image/gif',
        '.svg':  'image/svg+xml',
        '.wav':  'audio/wav',
        '.mp4':  'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf':  'application/font-ttf',
        '.eot':  'application/vnd.ms-fontobject',
        '.otf':  'application/font-otf',
        '.wasm': 'application/wasm'
    };

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': mimeTypes[extname] || 'application/octet-stream' });
            res.end(content, 'utf-8');
        }
    });
});
module.exports = { server, PORT };