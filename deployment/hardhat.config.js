require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xkey'

const AMOY_RPC_URL = process.env.AMOY_RPC_URL || ''
const POLYGON_API_KEY = process.env.POLYGON_API_KEY || ''

const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL || ''
const ARBITRUM_API_KEY = process.env.ARBITRUM_API_KEY || ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.20',
      },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    amoy: {
      url: AMOY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80002,
      blockConfirmations: 6,
    },
    arbsepo: {
      url: ARBITRUM_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 421614,
      blockConfirmations: 6,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/', // ? url running from npx hardhat node
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: POLYGON_API_KEY,
      arbitrumSepolia: ARBITRUM_API_KEY,
    },
  },
}
