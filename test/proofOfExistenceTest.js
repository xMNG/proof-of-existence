const ProofOfExistence = artifacts.require("ProofOfExistence");

contract("ProofOfExistence", (accounts) => {
    owner = accounts[0];

    let poe;
    const IPFSHASH = "QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j"

    beforeEach(async () => {
        poe = await ProofOfExistence.new();
    })

    describe("Setup", () => {
        it("should set a constructor value", async () => {
            poe = await ProofOfExistence.deployed();
            let result = await poe.getOwner();
            assert.equal(result, owner);
        })
    })

    describe("Add a user", async () => {
        beforeEach(async () => {
            await poe.addUser("mike");
        })

        it("should allow adding a user", async () => {
            let result = await poe.users(owner);
            assert.equal(result.name, "mike");
            assert.equal(result.length, 0);
        })

        it("should not allow adding the same user", async () => {
            try {
                await poe.addUser("mike");
                done("should have reverted")
            } catch (error) {
                assert.equal(error.reason, 'user already initialized')
            }
        })
    })

    describe("Add ipfs hash", async () => {
        // beforeEach(async () => {
        //     await poe.addUser("mike");
        // })

        it("should allow adding an IPFS hash, description, and timestamp", async () => {
            await poe.addUser("mike");

            await poe.addIPFSHash("generic description", IPFSHASH, "#fakenews #tutorialHell");
            let result = await poe.getData(0);
            assert.equal(result.description, "generic description", "description matches")
            assert.equal(result.hashStr, IPFSHASH, "ifps hash matches")
            assert.equal(result.tags, "#fakenews #tutorialHell", "tags match")

            // check currLenn incremented
            let currLen = (await poe.users(owner)).length;
            assert.equal(currLen, 1, "currLen has incremented");
        })

        it("disallows adding IPFS hash before user is added", async () => {
            try {
                await poe.addIPFSHash("generic description", IPFSHASH, "#fakenews #tutorialHell");
                done("should have reverted")
            } catch (error) {
                assert.equal(error.reason, 'user not initialized')
            }
        })
    })

})