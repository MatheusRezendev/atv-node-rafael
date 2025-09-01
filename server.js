const http = require('http');
const url = require('url');
const fs = require('fs');

const saudacaoHandler = require('./rotas/saudacao');
const dobroHandler = require('./rotas/dobro');
const formularioHandler = require('./rotas/formulario');
const somaHandler = require('./rotas/soma');

const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    console.log(`Requisição: ${req.method} ${pathname}`);

    if (req.method === "GET") {
        switch (pathname) {
            case '/':
                fs.readFile('index.html', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                        res.end('Erro interno do servidor');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(data);
                });
                break;
            case '/saudacao':
                saudacaoHandler(req, res);
                break;
            case '/dobro':
                dobroHandler(req, res);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Rota não encontrada');
        }
    } else if (req.method === "POST") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            switch (pathname) {
                case '/formulario':
                    formularioHandler(req, res, body);
                    break;
                case '/soma':
                    somaHandler(req, res, body);
                    break;
                default:
                    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('Rota não encontrada');
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Método não permitido');
    }
});

server.listen(port, '127.0.0.1', () => {
    console.log(`Server rodando em http://127.0.0.1:${port}`);
});
