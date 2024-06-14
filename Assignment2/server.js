const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const { method, url } = req;
    const filePath = path.join(__dirname, url);

    if (method === 'POST' && url === '/create') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { filename, content } = JSON.parse(body);
            const fileToCreate = path.join(__dirname, filename);
            fs.writeFile(fileToCreate, content, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error creating file');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('File created successfully');
                }
            });
        });
    } else if (method === 'GET') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    } else if (method === 'DELETE') {
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File deleted successfully');
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method not allowed');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
