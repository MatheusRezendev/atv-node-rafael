const querystring = require('querystring');

const TAXA_USD_BRL = 5;
const TAXA_EUR_BRL = 5.5;

function handleFormulario(req, res, body) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    try {
        const { valor, moeda } = querystring.parse(body);

        if (valor && moeda && !isNaN(valor)) {
            const valorNumerico = parseFloat(valor);
            let valorConvertido;
            let taxa;

            if (moeda === 'USD') {
                valorConvertido = valorNumerico * TAXA_USD_BRL;
                taxa = 'USD';
            } else if (moeda === 'EUR') {
                valorConvertido = valorNumerico * TAXA_EUR_BRL;
                taxa = 'EUR';
            } else {
                res.writeHead(400);
                res.end('Erro: Moeda inválida. Use USD ou EUR.');
                return;
            }

            res.writeHead(200);
            res.end(`${valorNumerico} ${taxa} equivalem a R$ ${valorConvertido.toFixed(2)}`);
        } else {
            res.writeHead(400);
            res.end('Erro: Os parâmetros "valor" (numérico) e "moeda" são obrigatórios.');
        }
    } catch (error) {
        res.writeHead(400);
        res.end('Erro ao processar a requisição.');
    }
}

module.exports = handleFormulario;