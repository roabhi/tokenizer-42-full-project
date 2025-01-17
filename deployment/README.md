# Tokenizer

This is an Outer Core 42 project

As a participant in this project, you will have the opportunity to contribute to the creation of a digital asset on the blockchain.

This project is designed to challenge you in
several areas, including your ability to master multiple programming languages and your
familiarity with public blockchain technology.

While a strong background in cryptography is not required for this project, you should
be prepared to learn and adapt as you work towards creating your own digital asset. This
project will require you to think critically and creatively, as well as to push yourself out
of your comfort zone as you navigate the complexities of blockchain technology.
Ultimately, your participation in this project will not only help you develop valuable
skills and knowledge, but it will also allow you to be a part of something truly innovative
and exciting. Are you ready to take on the challenge?

Let’s get started!

## About the project

This project uses [hardhat](https://hardhat.org/) to deploy the AltarianToken contract written in Solidity to the Polygon Amoy testnet.

In order to test and deploy the contract you have to have a .env file with the following variables:

- `PRIVATE_KEY`: The private key of the account that will deploy the contract. You can use your [MetaMask](https://metamask.io/) private key.
- `AMOY_RPC_URL`: The RPC URL of the Polygon Amoy testnet. You can get this url from [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/).
- `ETHERSCAN_API_KEY`: The API key of [Etherscan website](https://etherscan.io/) needed to verify the contract using the `verify` command from the hardhat-etherscan plugin.

You may also need to configure

- `POLYGON_API_KEY`: The API key of [Polygonscan website](https://polygonscan.com/) needed to verify the contract using the `verify` command from the hardhat-etherscan plugin.

The contract can be tested locally using the following command:

```bash
npx hardhat test
```

The contract is deployed using the following command:

```bash
npx hardhat run scripts/deployAltarianTokenToAmoy.js --network amoy
```
