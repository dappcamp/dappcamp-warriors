// SPDX-License-Identifier: MIT
/**
 * @dev Use a recent version of the compiler to leverage the latest optimization features
 *   - (Potentially) Reduces contract bytecode
 *   - (Potentially) Reduces execution gas
 */
pragma solidity ^0.8.4;

/**
 * @dev Avoid unneeded "security measures" (deleted ReentrancyGuard)
 *   - Reduces contract bytecode
 *   - Reduces execution gas
 */

import "@openzeppelin/contracts/access/Ownable.sol";
/**
 * @dev Favor importing interfaces over full contracts
 *   - Reduces contract bytecode
 */
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";

contract Optimized is IERC721Receiver, Ownable {
    uint256 public total = 1;
    uint256[] public numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    /**
     * @dev Pack variables
     *   - Reduces contract bytecode
     *   - Reduces execution gas
     * Read more: https://dev.to/javier123454321/solidity-gas-optimizations-pt-3-packing-structs-23f4
     */
    struct Data {
        uint64 a;
        uint64 b;
        uint128 c;
        uint256 d;
        /**
         * @dev If you're not packing variables, use uint256
         *   - Reduces execution gas
         * Explanation: the EVM reads 32 bytes at a time, so it needs to do some operations
         * (which have a cost) to convert uint16 to 32 bytes.
         */
        uint256 e;
    }
    Data public data;

    /**
     * @dev Favor `immutable` or `constant` variables
     *   - Reduces contract bytecode
     *   - Reduces execution gas
     */
    IERC20 private immutable camp;
    IERC721 private immutable dappCampWarriors;

    event EventA(uint128 a, uint256 length);

    constructor(address campAddress, address dappCampWarriorsAddress) {
        camp = IERC20(campAddress);
        dappCampWarriors = IERC721(dappCampWarriorsAddress);
    }

    function updateData(
        uint64 a,
        uint64 b,
        uint128 c,
        uint256 d,
        uint256 e
    ) public {
        data.a = a;
        data.b = b;
        data.c = c;
        data.d = d;
        data.e = e;
    }

    function onERC721Received(
        address,
        address,
        uint256 tokenId,
        bytes calldata
    ) external override returns (bytes4) {
        dappCampWarriors.transferFrom(address(this), this.owner(), tokenId);

        return IERC721Receiver(address(this)).onERC721Received.selector;
    }

    /**
     * @dev Use `calldata` instead of `memory` when the argument is read-only
     *   - Reduces execution gas
     */
    function emitEventA(bytes calldata input) public {
        emit EventA(data.a, input.length);
    }

    /**
     * @dev Avoid unneeded "security measures" (deleted nonReentrant)
     *   - Reduces contract bytecode
     *   - Reduces execution gas
     * Explanation: this function isn't prone to a reentrancy attack
     */
    function transferCamp(uint256 amount, address to) public {
        bool success1 = camp.approve(address(this), amount);
        bool success2 = camp.transferFrom(address(this), to, amount);

        /**
         * @dev Favor shorter revert strings
         *   - Reduces contract bytecode
         */
        require(success1 && success2, "Transfer failed.");
    }

    function transferDappCampWarrior(uint256 id, address to) public {
        dappCampWarriors.approve(address(this), id);
        /**
         * @dev Favor `transferFrom` over `safeTransferFrom` when the receiver is deterministic
         *   - Reduces execution gas
         * Explanation: safeTransferFrom does more operations and it's useful, for example, for input-based addresses
         */
        dappCampWarriors.transferFrom(address(this), to, id);
    }

    function addOddToTotal() public {
        /**
         * @dev Cache array length to avoid reading it on every step of the iteration
         *   - Reduces execution gas
         */
        uint256 len = numbers.length;

        for (uint256 i = 0; i < len; ) {
            /**
             * @dev Cache array elements to avoid reading them on every step of the iteration
             *   - Reduces execution gas
             */
            uint256 currentNumber = numbers[i];

            if (currentNumber % 2 != 0) total = total + currentNumber;

            /**
             * @dev Use unchecked math when you know that an overflow is impossible
             *   - Reduces execution gas
             */
            unchecked {
                i++;
            }
        }
    }
}
