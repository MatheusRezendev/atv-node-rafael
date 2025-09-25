const Endereco = require('../models/Endereco');

const validaDadosEndereco = (req, res, next) => {
  const { rua, numero, bairro, cidade, estado, cep } = req.body;

  // verifica se os campos obrigatórios foram enviados e não estão vazios
  if (!rua || !bairro || !cidade || !estado || !cep) {
    return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
  }

  // validação do estado (deve ter exatamente 2 caracteres)
  if (estado.length !== 2) {
    return res.status(400).send('O campo estado deve ter exatamente 2 caracteres.');
  }

  // validação cep (deve ter exatamente 9 caracteres)
  if (cep.length !== 9) {
    return res.status(400).send('O campo CEP deve ter exatamente 9 caracteres.');
  }

  next();
};

const buscaTodosEnderecos = async (req, res, next) => {
  try {
    const enderecos = await Endereco.findAll({
      order: [['id', 'ASC']]
    });
    res.locals.enderecos = enderecos;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar endereços.');
  }
};

const buscaEnderecoPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const endereco = await Endereco.findByPk(id);
    if (!endereco) {
      return res.status(404).send('Endereço não encontrado');
    }
    res.locals.endereco = endereco;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar o endereço.');
  }
};

module.exports = {
  validaDadosEndereco,
  buscaTodosEnderecos,
  buscaEnderecoPorId,
};
