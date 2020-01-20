pragma solidity ^0.5.0;

import "./ProofOfExistence.sol";

contract PoeFactory {
    mapping(address => address) public userContracts;
    
    event LogCreateContract(address indexed msgSender, address indexed createdAddr);

    function createContract() external {
        require(userContracts[msg.sender] == address(0), "user already has a contract!");

        ProofOfExistence newContract = new ProofOfExistence(msg.sender);
        userContracts[msg.sender] = address(newContract);
        emit LogCreateContract(msg.sender, address(newContract));
    }
}
