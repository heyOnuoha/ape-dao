require('dotenv').config()

const HDWalletProvider = require('truffle-hdwallet-provider')
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker')
const utils = require('web3-utils')
const MNEMONIC = process.env.MNEMONIC || process.env.NMEMORIC
const hdWalletStartIndex = 0
const hdWalletAccounts = 1
let hdWalletProvider

const setupWallet = (url) => {

    if (!hdWalletProvider) {

        hdWalletProvider = new HDWalletProvider(MNEMONIC, url, hdWalletStartIndex, hdWalletAccounts)
        hdWalletProvider.engine.addProvider(new NonceTrackerSubprovider())
    }

    return hdWalletProvider
}

module.exports = {

  plugins: ['truffle-plugin-verify'],
  networks: {

    testnet: {
      provider: () => setupWallet('http://localhost:8545'),
      network_id: 0x4e454153,
      gas: 10000000,
      // from: '0x6A33382de9f73B846878a57500d055B981229ac4'
    },

    rinkeby: {
      provider: () => setupWallet(`https://rinkeby.infura.io/v3/${process.env.INFURA_TOKEN}`),
      network_id: 0x4,
      from: '0x0179d9BF263244D9A48352975412370B17E50063',
      // gas: 3 * 1000000,
      // gasPrice: utils.toWei('8', 'gwei')
    }
  },


  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.2",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
  api_keys: {
    etherscan: 'QRJI2FN8I1F3KQXY2JIU3E9BEPHCS3JE6G'
  }
};
