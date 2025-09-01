const url = require('url');

function handleSaudacao(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const nome = parsedUrl.query.nome;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    if (nome) {
        res.writeHead(200);
        res.end(`Olá, ${nome}! Seja bem-vindo.`);
    } else {
        res.writeHead(400);
        res.end('Erro: O parâmetro "nome" é obrigatório.');
    }
}

module.exports = handleSaudacao;
