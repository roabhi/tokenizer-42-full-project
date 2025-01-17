//* imports

const { ethers, run, network } = require('hardhat')

//? Deployment

async function verify(contractAddreess, args) {
  console.log('Verifying contract...')

  try {
    await run('verify:verify', {
      address: contractAddreess,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified')
    } else {
      console.log(e)
    }
  }
}

async function main() {
  console.log('Deploying contract')

  const AltarianToken = await ethers.getContractFactory('AltarianToken')
  altarianToken = await AltarianToken.deploy()
  await altarianToken.waitForDeployment()

  console.log(`Deployed contract to ${altarianToken.target}`)

  if (network.config.chainId === 80002 && process.env.ETHERSCAN_API_KEY) {
    console.log('Awaiting block confirmations')
    await altarianToken.deploymentTransaction().wait(6) // ? wait 6 blocks prior to verify our contract
    await verify(altarianToken.target, [])
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
