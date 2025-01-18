# Tokenizer

As a participant in this project, you will have the opportunity to contribute to the creation of a digital asset on the blockchain. This project is designed to challenge you in
several areas, including your ability to master multiple programming languages and your
familiarity with public blockchain technology.

## About the project

For this project I wanted to go beyond the requirements for the project by providing a tool to put in good use what a native token for the 42 network could bring to students.

The goal for me was to incorporate the 42 Curriculum into project in some way and to regard students as they complete rings from the Common Core using an ERC20 token that can only be obtained based on the student's achievements. Using the 42 API I was able to implement an indirect multi signature method to allow students to claim their tokens.

This is an on going project and the tokenomics are still under development. The final goal goes beyond the requirements of the project and aims to provide a whole ecosystem for the 42 network where students can exchange the time and effort they put into the 42 curriculum to good use in the real world.

## Project Steps

- [x] Create an API service on the 42 network able to access and retieve user data.
- [x] Create a smartcontract that allows students to claim tokens based on their achievements.
- [x] Design and program a frontend that allows students to claim their tokens.

## The Chain

The chain used for this project is [Polygon Amoy](https://polygon.technology/blog/introducing-the-amoy-testnet-for-polygon-pos). The reason for this choice is that it is a testnet chain that does not require spending real money to deploy and test the contract. Faucet is included in the Front End application for students to be able to get the necessary amount of tokens to interact with the contract. Polygon Amoy is compatible with the Ethereum Virtual Machine (EVM) and the use of Solidity as the programming language. It has low gas fees and as a testnet L2 solution, its security is leveraging the security of the Ethereum Sepolia testnet, the most well known and reliable testnet for PoS on Ethereum.

## The Smart Contract

The smart contract is a modified version of the ERC20 standard contract from the [OpenZeppelin library](https://www.openzeppelin.com/). That helped me to rely on fully adudited smart contracts and to focus on the logic of the project. It has been modified to include functionality that allows students to claim their tokens based on their achievements.

## Contract Address

- [AltarianToken](https://amoy.polygonscan.com/address/0x491792397DE8398D2B0aF4E7c1da5aEc6905Dc00)

Full code to review is under /code folder.

## Design and Programing the Frontend

The design for the front aimed to be a NextJS application very minimalistic and easy to use

- [Tokenizer Design](https://www.figma.com/design/VqgbOZERFMoHoanRMcmq9C/Tokenizer-NextJS-Front?node-id=0-1&p=f&t=Nx6tIie44M2qRKxC-0)

The front end uses [wagmi](https://wagmi.sh/)/[viem](https://viem.sh/) libraries to connect to the blockchain and to interact with the smart contract using Typescript leveraging their hooks, reactivity capabilites and its interoperability with React based frameworks such NextJS. [ConnectKit](https://docs.family.co/connectkit) was used ad solution for connecting wallets to the application so users have more freedom when it comes to choosing a wallet. [TailwindCSS](https://tailwindcss.com/) was used for styling.

The full code for the frontend can be seen directly from the application website itself or [here](https://github.com/roabhi/tokenizer-new-subject-42)

## Interact with the contract from a live version of the web app

Live version is deployed on Vercel. Once there, you first need to sign up with your 42 account and connect your wallet in order to claim any rewards. This is a safe mechanism to ensure only 42 students can access the application with a trusted wallet allowed for ConnectKit.

- [NextJS Frontend](https://tokenizer-new-subject-42.vercel.app/)

## Video presentation

- [Tokenizer 42 video presentation](https://youtu.be/-QJeZRfGZWo)
