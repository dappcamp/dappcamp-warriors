// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";

contract NonOptimized is ReentrancyGuard, IERC721Receiver, Ownable {
    uint256 public total = 1;
    uint256[] public numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    struct Data {
        uint64 a;
        uint256 d;
        uint64 b;
        uint128 c;
        uint16 e;
    }
    Data public data;

    ERC20 private camp;
    ERC721 private dappCampWarriors;

    event EventA(uint128 a, uint256 length);

    constructor(address campAddress, address dappCampWarriorsAddress) {
        camp = ERC20(campAddress);
        dappCampWarriors = ERC721(dappCampWarriorsAddress);
    }

    function updateData(
        uint64 a,
        uint256 d,
        uint64 b,
        uint128 c,
        uint16 e
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

    function emitEventA(bytes memory input) public {
        emit EventA(data.a, input.length);
    }

    function transferCamp(uint256 amount, address to) public nonReentrant {
        bool success1 = camp.approve(address(this), amount);
        bool success2 = camp.transferFrom(address(this), to, amount);

        require(
            success1 && success2,
            "The transfer failed, either approve or transferFrom didn't return true."
        );
    }

    function transferDappCampWarrior(uint256 id, address to) public {
        dappCampWarriors.approve(address(this), id);
        dappCampWarriors.safeTransferFrom(address(this), to, id);
    }

    function addOddToTotal() public {
        for (uint256 i = 0; i < numbers.length; i++) {
            bool isOdd = numbers[i] % 2 != 0;
            if (isOdd) total = total + numbers[i];
        }
    }
}
