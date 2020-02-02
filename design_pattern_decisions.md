# Design Pattern Decisions

![ProofOfExistenceUML](https://raw.githubusercontent.com/xMNG/proof-of-existence/master/githubImages/contractsUML.png "Contracts UML")

There are two main design patterns that I chose between for this dapp. They are:

- Use events for cheaper storage 
- Use contract state variables for storage

There are pros and cons / trade-offs for each approach. For events, we can acheive cheaper storage than storing on contract state (20000 gas for `SSTORE` vs roughly 8 gas per byte of log data in `LOG0`, more for indexed arguments), but we must crawl through historical blocks in order to retrieve all pinned ipfs hashes. This would involved repeatedly calling the node or api. Storing the pins on contract state costs more in gas but allows immediate retrieval of the information.

For this project, I decided to use the state variable design pattern due to the most likely use case for this dapp. I posited that compared to centralized services (dropbox, google drive) file uploads on this dapp would be relatively infrequent and reserved only for the most important files that require maximal decentralization. Therefore, I assume that a user would be willing to pay a little more gas for these distinguishing properties. As Ethereum scales, this type of dapp may become less expensive to use.

# Structure of App
## Factory Contract 
 This project utilizes a factory contract deployed by an admin. The factory contract deploys child contracts that contain the logic for pinning IPFS hashes. This project could have simply stored each user's info and hashes via a struct on a single monolithic contract, but I wanted to separate these concerns because 1) I wanted to learn about the factory contract design pattern and 2) allow for extensibility through future owner / admin functionality.

 The factory contract has a few key features:

 Admin
 - Can pause the factory contract (circuit breaker)
 - Can withdraw any ETH

 User
 - Can create their own Proof of Existence child contract

#### Circuit Breaker
The admin of the factory contract is able to `pause` the `createContract` function as a circuit breaker to halt the functionality of the factory contract, preventing new child contracts from being created through the `whenNotPaused` and `whenPaused` modifiers. 

#### Eth Payments
The admin of the factory contract is able to charge a fee for creation of child contracts. This is done through the `price` state variable, and adjustable by the admin through the `setPrice` function. Currently, the `price` is set to 0 to allow free (excluding gas) child contract creation. The admin can chose to levy a fee by setting this `price` to their desired amount.  

## Proof Of Existence Contract
This contract contains all the logic and functionality for pinning the IPFS hash to the contract's state. This includes the `addIPFSHash` function. The `addIPFSHash` takes a `description`, `ipfs hash string` and `hash tags`, and stores these and a `timestamp` on the contract's state. To do so, these properties are wrapped into a `Data` struct which is then stored on a `DataMap` mapping. The `DataMap` uses a `uint` to `Data` struct mapping via the `uint dataCount`.

The data is then retrieved by using the `getData` function and passing in the `uint` index. The `getData` function returns the `description`, `ipfs hash string`, `hash tags`, and `timestamp` fields.


# Future Plans

## delegateCall
The child contract can perhaps use a delegateCall to avoid repeat deployments of the child contract with all the functions. Instead, the child contract would have the address of the library and the required state variables, calling the library each time. This depends on the trade off between how often new contracts are deployed and how much the additional gas cost is for repeat function calls.
