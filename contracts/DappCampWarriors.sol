/**
 * @dev Since most of your contract's source code will be available publicly,
 * it's highly encouraged to start them with a SPDX License Identifier.
 */
// SPDX-License-Identifier: MIT
/**
 * @dev Every contract should include this pragma directive.
 * It tells the compiler which version to use, since using the wrong one may introduce breaking changes.
 */
pragma solidity ^0.8.4;

/**
 * @dev Here, we import multiple OpenZeppelin contracts. As I mention in the OpenZeppelin section of the README,
 * it's highly recommended to use their contracts always that you can, and not to reinvent the wheel.
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
 * @dev An authorization implementation for our smart contract, to restrict access to some functions.
 */
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev We're inheriting from two of the contracts we imported before,
 * a lot of Solidity's reusability happens via inheritance.
 * ERC721 receives two hardcoded params, which its constructor will receive as arguments.
 * Note that the params can be dynamic too, you can see an example here: https://solidity-by-example.org/constructor/.
 * Ownable doesn't receive any param, after extending it our contract is able to use the `onlyOwner` modifier, among others.
 */
contract DappCampWarriors is ERC721("DappCampWarriors", "DWAR"), Ownable {
    /**
     * @dev It's not all about inheritance, we can also compose functionality by `using` a library.
     * Read more about the `using` directive: https://docs.soliditylang.org/en/v0.8.13/contracts.html#using-for.
     */
    using Counters for Counters.Counter;

    /**
     * @dev There's 3 things to note in this line of code:
     *      1) We're using a custom data type which we defined on top.
     *      2) We're using the `internal` keyword.
     *      3) We're prefixing the variable with an underscore, because it's internal.
     * Read more about `internal`: https://docs.soliditylang.org/en/v0.8.13/contracts.html#state-variable-visibility.
     * Notice that the underscore convention for internal variables and functions is not in Solidity's style guide,
     * but it's a widely used convention and OpenZeppelin's contracts use it.
     * Read the Solidity style guide here: https://docs.soliditylang.org/en/v0.8.13/style-guide.html.
     */
    Counters.Counter public _tokenIds;

    /**
     * @dev baseURI is the URI that's used to construct the URL in which the metadata of the NFT is hosted.
     * Making it `public` provides us with a getter that makes reading it more convenient.
     */
    string public baseURI;

    /**
     * @dev The constructor method is executed once, on contract deployment.
     * It's important to have in mind that all the constructors of the inherited contracts will be executed too,
     * in this case Ownable and ERC721.
     * I recommend you reading the constructors of the contracts you inherit,
     * you'll note, for example, that Ownable sets the deployer as the initial owner.
     */
    constructor() {
        /**
         * @dev Mints 10 NFTs owned by the contract deployer.
         */
        for (uint256 i = 0; i < 10; i++) {
            mint(msg.sender);
        }
    }

    /**
     * @dev Overriding a function from OpenZeppelin's ERC-721.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /**
     * @dev Note that the onlyOwner modifier is being used, otherwise anyone could change the baseURI of our collection.
     */
    function setBaseURI(string memory _baseURIParam) public onlyOwner {
        baseURI = _baseURIParam;
    }

    /**
     * @dev We decided that only the owner of the contract will be able to mint, this is an arbitrary decision,
     * other NFT collections may allow anyone (virtually unlimited supply) or no-one (scarce NFT collection) to mint.
     */
    function mint(address to) public onlyOwner returns (uint256) {
        uint256 newWarriorId = _tokenIds.current();
        _safeMint(to, newWarriorId);

        _tokenIds.increment();

        return newWarriorId;
    }
}
