pragma solidity ^0.5.0;

import "./ProofOfExistence.sol";
import "./Pausable.sol";

/*
* @dev Factory contract the enables deployment of child IPFS contracts
*/
contract PoeFactory is Pausable {
    mapping(address => address) public userContracts;
    uint256 public price = 0; // initialized to zero, but could require payment in eth to initiate new contract

    /*
    * @dev Event is used to trigger state change on web app
    */
    event LogCreateContract(
        address indexed msgSender,
        address indexed createdAddr
    );

    /*
    * @dev Constructor passes msg.sender as owner to Ownable through Pausable
    */
    constructor() public Ownable(msg.sender) {}

    /*
    * @dev createContract enables the deployment of child IPFS contracts and stores the address
    */
    function createContract() external payable whenNotPaused {
        require(
            userContracts[msg.sender] == address(0),
            "user already has a contract!"
        );
        require(msg.value >= price, "not enough eth"); // this will limit the child contract creation if the owner wants to collect rent

        ProofOfExistence newContract = new ProofOfExistence(msg.sender);
        userContracts[msg.sender] = address(newContract);
        emit LogCreateContract(msg.sender, address(newContract));
    }

    /*
    * @dev allows owner to set the price for creating a new child IPFS contract
    * @param setPrice - price in wei
    */
    function setPrice(uint256 _price) public onlyOwner whenNotPaused {
        price = _price;
    }

    /*
    * @dev allows owner to empty the account of eth, if factory function has payment enabled
    */
    function withdrawEth() public onlyOwner whenNotPaused {
        msg.sender.transfer(address(this).balance);
    }

}
