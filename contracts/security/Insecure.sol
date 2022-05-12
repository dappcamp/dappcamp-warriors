// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Insecure {
    mapping(address => uint256) private userBalances;

    function unsafeWithdrawBalance() public {
        uint256 amountToWithdraw = userBalances[msg.sender];
        (bool success, ) = msg.sender.call{value: amountToWithdraw}("");
        require(success, "Error withdrawing balance.");
        userBalances[msg.sender] = 0;
    }

    address public highestBidder;
    uint256 public highestBid;

    function unsafeBid() public payable {
        require(msg.value >= highestBid, "Bid is too low");

        if (highestBidder != address(0)) {
            /**
             * @dev We're calling a user-provided address, we don't know if it's a contract or an EOA.
             * If it's a contract and this call fails consistently, no one else can bid.
             */
            (bool success, ) = highestBidder.call{value: highestBid}("");
            require(success, "Error bidding");
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }
}
