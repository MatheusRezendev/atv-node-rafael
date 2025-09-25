const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // importa a conexão do banco

const Endereco = sequelize.define('Endereco', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo rua é obrigatório'
      }
    }
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo bairro é obrigatório'
      }
    }
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo cidade é obrigatório'
      }
    }
  },
  estado: {
    type: DataTypes.STRING(2),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo estado é obrigatório'
      },
      len: {
        args: [2, 2],
        msg: 'O campo estado deve ter exatamente 2 caracteres'
      }
    }
  },
  cep: {
    type: DataTypes.STRING(9),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo CEP é obrigatório'
      },
      len: {
        args: [8, 8],
        msg: 'O campo CEP deve ter exatamente 8 caracteres'
      }
    }
  }
}, {
  tableName: 'enderecos',
  timestamps: false
});

module.exports = Endereco;
