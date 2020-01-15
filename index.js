const BCHnode = require('bitcoin-cash-rpc');

const { host, username, password, port } = require('./config/config.js');

const bch = new BCHnode(host, username, password, port, 3000, false);

(async function () {
  let asdf = await bch.getInfo('');
})();
