 # Common Attacks

 ## Integer Overflow

For solidity's uint256 data type, the value ranges are 0 to 2^256 - 1 inclusive. A uin256 set to 0 and minus 1 will underflow to 2^256 - 1, while 2^256 will overflow to 0. 

The ProofOfExistence contract has one instance of addition for the `uint256 public dataCount` state variable. Instead of incrementing `dataCount` by using `dataCount++` which can overflow (extremely unlikely), we use SafeMath from OpenZeppelin to ensure no overflows occur. 

To use SafeMath, we first imported the library (or refer to an existing deployed one) and then attach `using SafeMath for uint256;` at the top of the contract. Then we can increment the `dataCount` variable by using the `add` function like this: `dataCount = dataCount.add(1)`. 

In the unlikely event that `dataCount` reaches the upper bound, the user can simply generate another address and continue to use the dapp.

## Gas Limit DOS On Unbounded Operations

Loops are vulnerable to gas limit DOS if the looping operations exceeds the gas limit for the block. For example, if a user's data was stored on a `struct` and stored in an array `struct[] arrayName` data structure, then using a loop to find an empty `uint` to write to could cause a gas limit dos. The reason is that with enough loops, the gas limit for the transaction exceed the block's gas limit and thus prevent the transaction from being mined. This can be solved using an additional `uint public counter` state variable to keep track of current count of items. 

In this contract, I opted for a mapping `mapping(uint256 => structName)` with a counter `uint256 public dataCount` to avoid looping. This allows O(1) write and reads. 

