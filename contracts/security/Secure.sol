// SPDX-License-Identifier: MIT
/**
 * @dev Use a deterministic compiler version.
 * Using a caret ^ in the contract version implies that your contract
 * can be compiled with multiple compiler versions (^0.8.13 -> 0.*.*).
 */
pragma solidity 0.8.13;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Secure is ReentrancyGuard {
    mapping(address => uint256) private userBalances;

    /**
     * @dev The insecure `withdrawBalance` implementation was prone to a reentrancy attack.
     * Below you can find two possible ways to prevent it.
     * See: https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/
     */

    function withdrawBalance1() public {
        uint256 amountToWithdraw = userBalances[msg.sender];
        /**
         * @dev Prevent reentrancy by setting contract state and then performing the transfer.
         * See: https://docs.soliditylang.org/en/latest/security-considerations.html#use-the-checks-effects-interactions-pattern
         */
        userBalances[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amountToWithdraw}("");
        require(success, "Error withdrawing balance.");
    }

    /**
     * @dev Prevent reentrancy by using OpenZeppelin's ReentrancyGuard.
     * See: https://docs.openzeppelin.com/contracts/2.x/api/utils#ReentrancyGuard
     */
    function withdrawBalance2() public nonReentrant {
        uint256 amountToWithdraw = userBalances[msg.sender];
        (bool success, ) = msg.sender.call{value: amountToWithdraw}("");
        require(success, "Error withdrawing balance.");
        userBalances[msg.sender] = 0;
    }
}
