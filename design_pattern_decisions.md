# Design Pattern Decisions

![ProofOfExistenceUML](https://raw.githubusercontent.com/xMNG/proof-of-existence/master/githubImages/contractsUML.png "Contracts UML")

There are two main design patterns that I chose between for this dapp. They are:

- Use events for cheaper storage 
- Use contract state variables for storage

Here are the pros and cons for each approach:

# Events

Pros
- Cheap storage vs SSTORE

Cons
- Only last ~256 blocks are checked, any further and will have to search historical blocks which may slow down the app
- 

# State
Pros
-

Cons
-



# Structure of App
Hash tables for lookup
No loops
Circuit breaker

future: delegate call