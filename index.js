const BCHnode = require('bitcoin-cash-rpc');

const {
  host,
  username,
  password,
  port,
  sendTo
} = require('./config/config.js');

const bch = new BCHnode(host, username, password, port, 3000, false);

const schedule = require('node-schedule');

async function getBalance() {
  const { balance } = await bch.getWalletInfo('');
  return balance;
}

async function send(amount) {
  const result = await bch.sendToAddress(sendTo, amount);
  return result;
}

async function run() {
  const balance = await getBalance();

  if (balance <= 0.000006) {
    return;
  }

  const total = balance - 0.00000500
  const txid = await send(total);
  console.log(`sent ${balance}. TXID: ${txid}`);
  return;
}

(async function () {
  console.log('started scheduler');

  schedule.scheduleJob('*/51 * * * *', async () => {
    run();
    console.log('ran update on  ', Date.now());
  });
})();
