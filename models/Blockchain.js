class Blockchain {
  constructor() {
    this.blocks = [];
  }
  addBlock(block) {
    this.blocks.push(block);
  }
  blockHeight() {
    return this.blocks.length;
  }
  lastBlock() {
    return this.blocks[this.blocks.length-1];
  }
}

module.exports = Blockchain;
