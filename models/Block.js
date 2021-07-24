const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(previousHash) {
    this.previousHash = previousHash; 
    this.timestamp = Date.now();
    this.nonce = 0;
    this.transactions = [];
  }
  addTransaction(tx) {
    this.transactions.push(tx);
  }
  hash() {
    return SHA256(
      this.previousHash + "" +
      this.timestamp + "" +
      this.nonce + "" +
      JSON.stringify(this.transactions)
    ).toString();
  }
  execute() {
    this.transactions.forEach(x => x.execute());
  }
}

module.exports = Block;
