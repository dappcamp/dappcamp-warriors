/**
 * @dev Since most of your contract's source code will be available publicly,
 * it's highly encouraged to start them with a SPDX License Identifier.
 */
// SPDX-License-Identifier: MIT
/**
 * @dev All your contracts should include a pragma directive declaring the version of the compiler.
 * This prevents compiling your code with an incorrect version, since the compiler can introduce breaking changes across versions.
 */
pragma solidity ^0.8.4;

/**
 * @dev Here we import multiple OpenZeppelin contracts,
 * as I mentioned in the README, it's highly recommended not to reinvent the wheel.
 * On VS Code, press CMD/ctrl + click on the import string to open the contract source code.
 */

/**
 * @dev OpenZeppelin's implementation of EIP-721 https://eips.ethereum.org/EIPS/eip-721.
 */
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
/**
 * @dev A counter implementation, useful to issue incremental ids for our NFTs.
 */
import "@openzeppelin/contracts/utils/Counters.sol";
/**
 * @dev A permission implementation for our smart contract, to restrict write access to some functions.
 */
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev We're inheriting from two of the contracts we imported before,
 * a lot of Solidity's reusability happens via inheritance.
 * ERC721 receives two hardcoded params, which its constructor will receive as arguments.
 * Note that the params can be dynamic too, you can see an example here: https://solidity-by-example.org/constructor/.
 * Ownable doesn't receive any param, after extending it our contract is able, for example, to use the `onlyOwner` modifier.
 */
contract DappCampWarriors is ERC721("DappCampWarriors", "DWAR"), Ownable {
    /**
     * @dev It's not all about inheritance, we can also compose like we're doing here.
     */
    using Counters for Counters.Counter;

    Counters.Counter public _tokenIds;

    string public baseURI;

    constructor() {
        // Mint 10 NFTs initially
        for (uint256 i = 0; i < 10; i++) {
            mint(msg.sender);
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _baseURIParam) public onlyOwner {
        baseURI = _baseURIParam;
    }

    function mint(address to) public onlyOwner returns (uint256) {
        uint256 newWarriorId = _tokenIds.current();
        _safeMint(to, newWarriorId);

        _tokenIds.increment();

        return newWarriorId;
    }
}
