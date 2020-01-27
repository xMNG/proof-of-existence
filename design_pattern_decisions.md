# Design Pattern Decisions

![ProofOfExistenceUML](https://raw.githubusercontent.com/xMNG/proof-of-existence/master/githubImages/contractsUML.png "Contracts UML")

There are two main design patterns that I chose between for this dapp. They are:

- Use events for cheaper storage 
- Use contract state variables for storage

There are pros and cons / trade-offs for each approach. For events, we get cheaper storage than storing on contract state (SSTORE), but we must crawl through historical blocks in order to retrieve all pinned ipfs hashes. This would involved repeatedly calling the node or api. Storing the pins on contract state costs more in gas but allows immediate retrieval of the information.

For this project, I opted for a factory function deployed by an admin, which deploys child contracts that contain the logic for pinning IPFS hashes. This project could have simply stored each user's info and hashes via a struct on a single monolithic contract, but I wanted to separate these concerns because 1) I wanted to try out the factory function design pattern and 2) allow for extensibility through future owner / admin functionality.



# Structure of App
Hash tables for lookup
No loops
Circuit breaker

future: delegate call