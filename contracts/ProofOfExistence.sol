pragma solidity ^0.5.0;


// TODO: factory function!

contract ProofOfExistence {

    address public owner; // TODO: openZeppelin owner role
    /*
    * @dev these two state variables hold the data count and store the data structs
    */
    mapping(uint => Data) public DataMap;
    uint public dataCount;

    /*
    * @dev each Data has a description, hashStr, and stamp time
    */
    struct Data {
        string description;
        string hashStr;
        string tags;
        uint timeStamp;
    }

    /*
    * @dev logs adding an IPFS hash to a User's account
    */
    event LogAddIPFSHash(string indexed description, string hashStr, string indexed tags, uint indexed timeStamp);

    constructor() public {
        owner = msg.sender; // TODO: modify to accept address when factory function implemented
    }

    /*
    * @dev Adds ipfs hash using description and hashStr
    * @param description
    * @param hashStr
    */
    function addIPFSHash(string calldata description, string calldata hashStr, string calldata tags) external {
        require(bytes(description).length > 0, "description missing");
        require(bytes(hashStr).length > 0, "hashStr missing"); // not exact but can do check on front end as a less secure work around

        DataMap[dataCount] = Data(description, hashStr, tags, block.timestamp);
        emit LogAddIPFSHash(description, hashStr, tags, block.timestamp);

        dataCount++; // can use safeMath but unlikely to overflow uint256
    }

    /*
    * @dev getting for the IPFS hash for a user
    */
    function getData(uint DataMapIndex) external view returns(string memory description, string memory hashStr, string memory tags, uint timeStamp) {
        return (DataMap[DataMapIndex].description, DataMap[DataMapIndex].hashStr, DataMap[DataMapIndex].tags, DataMap[DataMapIndex].timeStamp);
    }
}
