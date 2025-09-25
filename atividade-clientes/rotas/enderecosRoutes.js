const express = require('express');
const router = express.Router();
const Endereco = require('../models/Endereco');
const {
  validaDadosEndereco,
  buscaTodosEnderecos,
  buscaEnderecoPorId,
} = require('../middlewares/enderecoMiddleware');

// lista endereços
router.get('/', buscaTodosEnderecos, (req, res) => {
  res.render('enderecos');
});

// form para novo endereço
router.get('/novo', (req, res) => {
  res.render('novo-endereco');
});

// criar novo endereço
router.post('/add', validaDadosEndereco, async (req, res) => {
  const { rua, numero, bairro, cidade, estado, cep } = req.body;
  try {
    await Endereco.create({
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep
    });
    res.redirect('/enderecos');
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      return res.render('novo-endereco', {
        error: errors.join(', ')
      });
    }
    res.status(500).send('Erro ao criar endereço.');
  }
});

// form para editar endereço
router.get('/editar/:id', buscaEnderecoPorId, (req, res) => {
  res.render('editar-endereco');
});

// atualizar endereço
router.post('/editar/:id', validaDadosEndereco, async (req, res) => {
  const { id } = req.params;
  const { rua, numero, bairro, cidade, estado, cep } = req.body;
  try {
    const endereco = await Endereco.findByPk(id);
    if (!endereco) {
      return res.status(404).send('Endereço não encontrado');
    }

    await endereco.update({
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep
    });
    res.redirect('/enderecos');
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeValidationError') {
      const [endereco] = await Promise.all([
        Endereco.findByPk(id)
      ]);
      const errors = error.errors.map(err => err.message);
      return res.render('editar-endereco', {
        endereco,
        error: errors.join(', ')
      });
    }
    res.status(500).send('Erro ao atualizar endereço.');
  }
});

// deletar endereço
router.post('/deletar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const endereco = await Endereco.findByPk(id);
    if (!endereco) {
      return res.status(404).send('Endereço não encontrado');
    }

    await endereco.destroy();
    res.redirect('/enderecos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao deletar endereço.');
  }
});

module.exports = router;
