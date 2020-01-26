 # Common Attacks

 ## Integer Overflow
 For solidity's uint256 data type, the value ranges are 0 to 2^256 - 1. A uin256 set to 0 and minus 1 will underflow to 2^256 - 1, while 2^256 will overflow to 0. 

The ProofOfExistence contract has one instance of addition for the `uint256 public dataCount` state variable. Instead of incrementing `dataCount` by using `dataCount++` which can overflow (extremely unlikely), we use SafeMath from OpenZeppelin to ensure no overflows occur. 

To use SafeMath, we first imported the library (or refer to an existing deployed one) and then attach `using SafeMath for uint256;` at the top of the contract. Then we can increment the `dataCount` variable by using the `add` function like this: `dataCount = dataCount.add(1)`. 

In the unlikely event that `dataCount` reaches the upper bound, the user can simply generate another address and continue to use the dapp.

## Gas Limit DOS On Unbounded Operations

 also might be able to do a delegateCall