// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Pass constructor arguments to ERC20.
 * If we implement them in Camp's constructor, they can be dynamic.
 * e.g.: constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {}
 */
contract Camp is ERC20("Camp", "CAMP"), Ownable {
    /**
     * @dev We'll implement simple mint and burn functions for now, and then add more complexity on next steps.
     * Only the owner of the contract, which is the deployer by default (see: Ownable), is able to mint and burn.
     * To be clear, anyone can call the functions, but the transaction will revert if they're not the owner.
     */

    function mint(address account, uint256 amount) public onlyOwner {
        /**
         * @dev ERC20 exposes both _mint and _burn `internal` functions.
         * Let's say you use the `internal` keyword in a function, the implications are:
         *   🚫 Your function cannot be called externally (not EOAs, nor contracts).
         *   ✅ Your function can be called by contracts that inherit from yours (like Camp does with ERC20).
         */
        ERC20._mint(account, amount);
    }

    function burn(address account, uint256 amount) public onlyOwner {
        ERC20._burn(account, amount);
    }

    /**
     * @dev If we remove the mint function, our ERC20 becomes useless, since the starting balance is 0 and we don't have any way to mint.
     * There are other ways to make our ERC20 useful without implementing those functions,
     * for example by minting an initial supply, owned by the deployer, in the constructor.
     */
}
