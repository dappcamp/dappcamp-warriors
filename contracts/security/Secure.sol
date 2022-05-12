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

    /**
     * @dev Pull don't push
     * See: https://consensys.github.io/smart-contract-best-practices/development-recommendations/general/external-calls/#favor-pull-over-push-for-external-calls
     */

    address public highestBidder;
    uint256 public highestBid;
    mapping(address => uint256) public refunds;

    function bid() public payable {
        require(msg.value >= highestBid, "Bid is too low");

        if (highestBidder != address(0)) {
            refunds[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    /**
     * @dev Make the users of your contract pull their balance.
     * Don't push it to them since it allows them to manipulate your bid.
     */
    function withdrawRefund() external {
        uint256 refund = refunds[msg.sender];
        refunds[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: refund}("");
        require(success, "Can't withdraw");
    }
}
