// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Insecure {
    mapping(address => uint256) private userBalances;

    function withdrawBalance() public {
        uint256 amountToWithdraw = userBalances[msg.sender];
        (bool success, ) = msg.sender.call{value: amountToWithdraw}("");
        require(success, "Error withdrawing balance.");
        userBalances[msg.sender] = 0;
    }
}
