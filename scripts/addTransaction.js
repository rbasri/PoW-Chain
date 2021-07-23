const client = require('./client');
// const {argv} = require('yargs');
// const {address} = argv;
const {PUBLIC_KEY} = require('../config');


client.request('addTransaction', [], function(err, response) {
  if(err) throw err;
  console.log(response.result);
});
