const client = require('./client');
const {argv} = require('yargs');
const {addressTo, amount} = argv;
const {PUBLIC_KEY} = require('../config');


client.request('addTransaction', [PUBLIC_KEY,addressTo,amount], function(err, response) {
  if(err) throw err;
  console.log(response.result);
});
