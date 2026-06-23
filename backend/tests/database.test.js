const test = require('node:test');
const assert = require('node:assert/strict');

const sequelize = require('../config/database');

test('la configuración de base de datos usa sqlite con un storage por defecto', () => {
  assert.equal(sequelize.options.dialect, 'sqlite');
  assert.match(sequelize.options.storage, /ecommerce\.sqlite$/);
});
