pragma solidity ^0.5.0;

import "./Pausable.sol";
import "./ProofOfExistence.sol";

contract PoeFactory is Pausable {
    mapping(address => address) public userContracts;

    function createContract() external {
        require(userContracts[msg.sender] == address(0), "user already has a contract!");
        // second check to make sure contract didn't self destruct
        ProofOfExistence newContract = new ProofOfExistence();
        userContracts[msg.sender] = address(newContract);
    }
}
