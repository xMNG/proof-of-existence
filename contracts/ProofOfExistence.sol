pragma solidity ^0.5.0;

import "./Ownable.sol";
import "./SafeMath.sol";

/*
* @dev This contract holds the data for each ipfs hash and associated getter/setter
*/
contract ProofOfExistence is Ownable {
    using SafeMath for uint256;
    /*
    * @dev these two state variables hold the data count and store the data structs
    */
    mapping(uint256 => Data) public DataMap;
    uint256 public dataCount;

    /*
    * @dev each Data has a description, hashStr, and stamp time
    */
    struct Data {
        string description;
        string hashStr;
        string tags;
        uint256 timeStamp;
    }

    /*
    * @dev logs adding an IPFS hash to a User's account
    */
    event LogAddIPFSHash(
        string indexed description,
        string hashStr,
        string indexed tags,
        uint256 indexed timeStamp
    );

    constructor(address payable _owner) public Ownable(_owner) {}

    /*
    * @dev Adds ipfs hash using description and hashStr
    * @param description - string description
    * @param hashStr - string IPFS hash
    * @param tags - string hashtags
    */
    function addIPFSHash(
        string calldata description,
        string calldata hashStr,
        string calldata tags
    ) external onlyOwner {
        require(bytes(description).length > 0, "description missing");
        require(bytes(hashStr).length > 0, "hashStr missing"); // not exact but can do check on front end as a less secure work around

        DataMap[dataCount] = Data(description, hashStr, tags, block.timestamp);
        emit LogAddIPFSHash(description, hashStr, tags, block.timestamp);

        dataCount = dataCount.add(1); // using SafeMath but unlikely to overflow uint256
    }

    /*
    * @dev getting for the IPFS hash for a user
    * @param DataMapIndex is the index for the data struct
    * @returns description, hashStr, tags, and timestamp
    */
    function getData(uint256 DataMapIndex)
        external
        view
        returns (
            string memory description,
            string memory hashStr,
            string memory tags,
            uint256 timeStamp
        )
    {
        return (
            DataMap[DataMapIndex].description,
            DataMap[DataMapIndex].hashStr,
            DataMap[DataMapIndex].tags,
            DataMap[DataMapIndex].timeStamp
        );
    }
}
