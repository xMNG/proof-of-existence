pragma solidity ^0.5.0;

import "./Pausable.sol";

// TODO: factory function!

contract ProofOfExistence is Pausable {

    /*
    * @dev each User has a name and their data in a mapping, plus total length
    */
    struct User {
        string name;
        mapping(uint => Data) data;
        uint length;
    }

    /*
    * @dev each Data has a description, hashStr, and stamp time
    */
    struct Data {
        string description;
        string hashStr;
        string tags;
        uint timeStamp;
    }

    mapping(address => User) public users;

    /*
    * @dev logs adding a user to the users
    */
    event LogAddUser(address indexed _address, string name);
    
    /*
    * @dev logs adding an IPFS hash to a User's account
    */
    event LogAddIPFSHash();

    constructor() public {}

    /*
    * @dev
    * @param name is the string description of your account's name
    */
    function addUser(string calldata name) external {
        require(users[msg.sender].length == 0 && keccak256(abi.encodePacked((users[msg.sender].name))) == keccak256(abi.encodePacked((""))), "user already initialized");
        
        users[msg.sender] = User(name, 0);
        emit LogAddUser(msg.sender, name);
    }

    /*
    * @dev Adds ipfs hash using description and hashStr
    * @param description
    * @param hashStr
    */
    function addIPFSHash(string calldata description, string calldata hashStr, string calldata tags) external {
        require(keccak256(abi.encodePacked((users[msg.sender].name))) != keccak256(abi.encodePacked((""))), "user not initialized");

        uint currLen = (users[msg.sender]).length;
        users[msg.sender].data[currLen].description = description;
        users[msg.sender].data[currLen].hashStr = hashStr;
        users[msg.sender].data[currLen].tags = tags;
        users[msg.sender].data[currLen].timeStamp = now;

        (users[msg.sender]).length += 1; // TODO: use safeMath
    }

    /*
    * @dev getting for the IPFS hash for a user
    */
    function getData(uint currLen) external view returns(string memory description, string memory hashStr, string memory tags, uint timeStamp) {
        require(currLen <= users[msg.sender].length, "currLen is out of bounds");

        return (users[msg.sender].data[currLen].description, users[msg.sender].data[currLen].hashStr, users[msg.sender].data[currLen].tags, users[msg.sender].data[currLen].timeStamp);
    }

    /**
     * @dev Called by only to kill contract and zero out state
     */
    function kill() public onlyOwner whenPaused {
        selfdestruct(msg.sender);
    }
}
