const querystring = require('querystring');

function handleSoma(req, res, body) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    try {
        const { a, b } = querystring.parse(body);

        if (a !== undefined && b !== undefined && !isNaN(a) && !isNaN(b)) {
            const resultado = Number(a) + Number(b);
            res.writeHead(200);
            res.end(`A soma de ${a} + ${b} é ${resultado}.`);
        } else {
            res.writeHead(400);
            res.end('Erro: Os parâmetros "a" e "b" são obrigatórios e devem ser números.');
        }
    } catch (error) {
        res.writeHead(400);
        res.end('Erro ao processar a requisição.');
    }
}

module.exports = handleSoma;