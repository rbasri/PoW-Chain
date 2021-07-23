const Blockchain = require('./models/Blockchain');

const db = {
  blockchain: new Blockchain(),
  utxos: [],
  mempool: [],
}

module.exports = db;
