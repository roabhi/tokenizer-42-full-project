const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('AltarianToken', function () {
  let AltarianToken, altarianToken, owner, student1, student2

  // Sample nickname for students
  const studentNickname1 = 'student42'
  const studentNickname2 = 'student99'

  beforeEach(async function () {
    ;[owner, student1, student2] = await ethers.getSigners()

    // Deploy the contract
    AltarianToken = await ethers.getContractFactory('AltarianToken')
    altarianToken = await AltarianToken.deploy()
    await altarianToken.waitForDeployment()
  })

  // 🧪 Test 1: Deployment
  it('Should deploy with correct initial supply', async function () {
    const totalSupply = await altarianToken.totalSupply()
    expect(totalSupply).to.equal(ethers.parseUnits('42000000', 18))
    expect(await altarianToken.balanceOf(owner.address)).to.equal(totalSupply)
  })

  // 🧪 Test 2: Mint Tokens (Admin Only)
  it('Owner should be able to mint tokens', async function () {
    await altarianToken.mint(ethers.parseUnits('1000', 18))
    const newBalance = await altarianToken.balanceOf(owner.address)
    expect(newBalance).to.equal(ethers.parseUnits('42001000', 18))
  })

  it('Non-owner should not be able to mint tokens', async function () {
    await expect(
      altarianToken.connect(student1).mint(ethers.parseUnits('1000', 18))
    ).to.be.revertedWithCustomError(altarianToken, 'OwnableUnauthorizedAccount')
  })

  // 🧪 Test 3: Claim Reward for Rings
  it('Student should be able to claim valid rings', async function () {
    await altarianToken
      .connect(owner)
      .transfer(student1.address, ethers.parseUnits('1000', 18))

    await altarianToken
      .connect(student1)
      .claimReward(studentNickname1, [0, 1], ethers.parseUnits('100', 18))

    const claimedRings = await altarianToken.getClaimedRings(studentNickname1)
    expect(claimedRings.map(Number)).to.include.members([0, 1])

    const studentBalance = await altarianToken.balanceOf(student1.address)
    expect(studentBalance).to.equal(ethers.parseUnits('1100', 18)) // 1000 initial + 100 reward
  })

  it('Should not allow double claim for the same ring', async function () {
    await altarianToken
      .connect(owner)
      .transfer(student1.address, ethers.parseUnits('1000', 18))

    await altarianToken
      .connect(student1)
      .claimReward(studentNickname1, [0], ethers.parseUnits('50', 18))

    await expect(
      altarianToken
        .connect(student1)
        .claimReward(studentNickname1, [0], ethers.parseUnits('50', 18))
    ).to.be.revertedWith('Ring already claimed')
  })

  it('Should reject invalid ring index claims', async function () {
    await expect(
      altarianToken
        .connect(student1)
        .claimReward(studentNickname1, [6], ethers.parseUnits('50', 18))
    ).to.be.revertedWith('Invalid ring index')
  })

  it('Should reject claims with zero reward amount', async function () {
    await expect(
      altarianToken
        .connect(student1)
        .claimReward(studentNickname1, [0], ethers.parseUnits('0', 18))
    ).to.be.revertedWith('Reward amount must be greater than zero')
  })

  // 🧪 Test 4: Fetch Claimed Rings
  it('Should return claimed rings for a student', async function () {
    await altarianToken
      .connect(student1)
      .claimReward(studentNickname1, [0, 2], ethers.parseUnits('100', 18))

    const claimedRings = await altarianToken.getClaimedRings(studentNickname1)
    expect(claimedRings.map(Number)).to.deep.equal([0, 2])
  })

  it('Should return empty array if no rings claimed', async function () {
    const claimedRings = await altarianToken.getClaimedRings(studentNickname2)
    expect(claimedRings.length).to.equal(0)
  })

  // 🧪 Test 5: Check if a Ring is Claimed
  it('Should correctly identify if a ring is claimed', async function () {
    await altarianToken
      .connect(student1)
      .claimReward(studentNickname1, [1], ethers.parseUnits('50', 18))

    const isClaimed = await altarianToken.isRingClaimed(studentNickname1, 1)
    expect(isClaimed).to.be.true

    const isNotClaimed = await altarianToken.isRingClaimed(studentNickname1, 2)
    expect(isNotClaimed).to.be.false
  })

  it('Should revert if checking an invalid ring index', async function () {
    await expect(
      altarianToken.isRingClaimed(studentNickname1, 6)
    ).to.be.revertedWith('Invalid ring index')
  })

  // 🧪 Test 6: Owner Can Transfer Tokens
  it('Owner should be able to transfer tokens', async function () {
    await altarianToken.transfer(
      student1.address,
      ethers.parseUnits('1000', 18)
    )
    const balance = await altarianToken.balanceOf(student1.address)
    expect(balance).to.equal(ethers.parseUnits('1000', 18))
  })

  it('Non-owner cannot transfer more tokens than owned', async function () {
    await expect(
      altarianToken
        .connect(student1)
        .transfer(student2.address, ethers.parseUnits('1000', 18))
    ).to.be.revertedWithCustomError(altarianToken, 'ERC20InsufficientBalance')
  })

  it('Owner should be able to reset claimed rings for a student', async function () {
    await altarianToken
      .connect(student1)
      .claimReward(studentNickname1, [0, 1, 2], ethers.parseUnits('150', 18))

    let claimedRings = await altarianToken.getClaimedRings(studentNickname1)
    expect(claimedRings.map(Number)).to.deep.equal([0, 1, 2])

    // Reset claimed rings
    await altarianToken.resetClaimedRings(studentNickname1)

    claimedRings = await altarianToken.getClaimedRings(studentNickname1)
    expect(claimedRings.length).to.equal(0)
  })

  it('Non-owner should not be able to reset claimed rings', async function () {
    await altarianToken
      .connect(student1)
      .claimReward(studentNickname1, [0], ethers.parseUnits('50', 18))

    await expect(
      altarianToken.connect(student1).resetClaimedRings(studentNickname1)
    ).to.be.revertedWithCustomError(altarianToken, 'OwnableUnauthorizedAccount')
  })
})
