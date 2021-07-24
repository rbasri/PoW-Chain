const Block = require('./models/Block');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const db = require('./db');
const {PUBLIC_KEY} = require('./config');
const TARGET_DIFFICULTY = BigInt("0x0000" + "F".repeat(60));
const BLOCK_REWARD = 10;
const TX_PER_BLOCK = 10;
const {mempool, utxos} = require('./db');

let mining = true;
mine();

function startMining() {
  mining = true;
  mine();
}

function stopMining() {
  mining = false;
}

function mine() {
  if(!mining) return;
  if(mempool.length > 0 || utxos.length === 0){
    const block = new Block();
    let i;
    for(i =0; i<TX_PER_BLOCK && mempool.length>0; i++){
      block.addTransaction(mempool.pop());
    }

    const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
    const coinbaseTX = new Transaction([], [coinbaseUTXO]);
    block.addTransaction(coinbaseTX);

    while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
      block.nonce++;
    }

    block.execute();

    db.blockchain.addBlock(block);

    console.log(`Mined ${i} transactions in block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);
  }
  setTimeout(mine, 2500);
}

module.exports = {
  startMining,
  stopMining,
};
