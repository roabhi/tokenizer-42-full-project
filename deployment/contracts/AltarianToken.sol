// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AltarianToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 42000000 * 10 ** 18;
    uint8 public constant TOTAL_RINGS = 6;

    mapping(string => mapping(uint8 => bool)) private claimedRings;

    constructor() ERC20("42AltarianERC", "42ALT") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Mint additional tokens (Owner only)
    function mint(uint256 amount) external onlyOwner {
        _mint(msg.sender, amount);
    }

    // Claim reward for completing rings
    function claimReward(
        string memory nickname,
        uint8[] memory rings,
        uint256 rewardAmount
    ) external {
        require(rewardAmount > 0, "Reward amount must be greater than zero");
        for (uint8 i = 0; i < rings.length; i++) {
            require(rings[i] < TOTAL_RINGS, "Invalid ring index");
            require(!claimedRings[nickname][rings[i]], "Ring already claimed");
            claimedRings[nickname][rings[i]] = true;
        }
        _transfer(owner(), msg.sender, rewardAmount);
    }

    // Get all claimed rings for a user
    function getClaimedRings(
        string memory nickname
    ) external view returns (uint8[] memory) {
        uint8[] memory userRings = new uint8[](TOTAL_RINGS);
        uint8 counter = 0;
        for (uint8 i = 0; i < TOTAL_RINGS; i++) {
            if (claimedRings[nickname][i]) {
                userRings[counter] = i;
                counter++;
            }
        }

        uint8[] memory result = new uint8[](counter);
        for (uint8 j = 0; j < counter; j++) {
            result[j] = userRings[j];
        }
        return result;
    }

    // Check if a ring is claimed for a user
    function isRingClaimed(
        string memory nickname,
        uint8 ringIndex
    ) external view returns (bool) {
        require(ringIndex < TOTAL_RINGS, "Invalid ring index");
        return claimedRings[nickname][ringIndex];
    }

    // 🆕 New Function: Reset all claimed rings for a specific user (Owner only)
    function resetClaimedRings(string memory nickname) external onlyOwner {
        for (uint8 i = 0; i < TOTAL_RINGS; i++) {
            if (claimedRings[nickname][i]) {
                claimedRings[nickname][i] = false;
            }
        }
    }
}
