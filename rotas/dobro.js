const url = require('url');

function handleDobro(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const numero = parsedUrl.query.numero;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    if (numero && !isNaN(numero)) {
        const dobro = parseFloat(numero) * 2;
        res.writeHead(200);
        res.end(`O dobro de ${numero} é ${dobro}.`);
    } else {
        res.writeHead(400);
        res.end('Erro: O parâmetro "numero" é obrigatório e deve ser um número.');
    }
}

module.exports = handleDobro;