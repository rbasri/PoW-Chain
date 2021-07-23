const {startMining, stopMining} = require('./mine');
const {PORT, PUBLIC_KEY} = require('./config');
const {utxos, blockchain, mempool} = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');


// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  const {method, params} = req.body;
  if(method === 'startMining') {
      startMining();
      res.send({ blockNumber: blockchain.blockHeight() });
      return;
  }
  if(method === 'stopMining') {
      stopMining();
      res.send({ blockNumber: blockchain.blockHeight() });
      return;
  }
  if(method === "getBalance") {
      const [address] = params;
      const ourUTXOs = utxos.filter(x => {
        return x.owner === address && !x.spent;
      });
      const sum = ourUTXOs.reduce((p,c) => p + c.amount, 0);
      res.send({ balance: sum.toString()});
  }
  if(method === "addTransaction"){
      console.log("got here");
      const [addressFrom, addressTo, amount] = [PUBLIC_KEY, "51234135", 5];
      const ourUTXOs = utxos.filter(x => {
        return x.owner === addressFrom && !x.spent;
      })
      const inputUTXOs = [];
      let leftToSend = amount;
      while(leftToSend > 0){
        const nextUTXO = ourUTXOs.pop();
        inputUTXOs.push(nextUTXO);
        leftToSend -= nextUTXO.amount;
      }
      outputUTXOs = [new UTXO(addressTo, amount), new UTXO(addressFrom, amount+leftToSend)];
      mempool.push(new Transaction(inputUTXOs, outputUTXOs));
      res.send("success");
  }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
