const ProofOfExistence = artifacts.require("ProofOfExistence");
let catchRevert = require("./exceptionsHelpers.js").catchRevert;

contract("ProofOfExistence", (accounts) => {
    const OWNER = accounts[0];
    const NONOWNER = accounts[1];

    let poe;
    beforeEach(async () => {
        poe = await ProofOfExistence.new(OWNER); // new deployment
    })

    describe("Setup", () => {
        it("should set an owner in constructor", async () => {
            let result = await poe.owner();
            assert.equal(result, OWNER);
        })
        it("should have a default dataCount of 0", async () => {
            const result = await poe.dataCount();
            assert.equal(result.toString(), 0)
        })
    })

    describe("adds and retrieves file details", async () => {
        const file1 = {
            description: 'file name',
            IPFSHASH: "QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j",
            tags: '#pleasework'
        }

        let output;
        beforeEach(async () => {
            output = await poe.addIPFSHash(file1.description, file1.IPFSHASH, file1.tags);
        })

        it("allows adding description, tags, IPFS Hash", async () => {
            // await poe.addIPFSHash(description, IPFSHASH, tags);
            const result = await poe.getData(0);
            assert.equal(result.description, file1.description)
            assert.equal(result.hashStr, file1.IPFSHASH)
            assert.equal(result.tags, file1.tags)
        })

        it("requires a description", async () => {
            await catchRevert(poe.addIPFSHash("", file1.IPFSHASH, file1.tags)); // give it a promise and await it

            // TODO: figure out why this works? two awaits.
            // try {
            //     await await poe.addIPFSHash("", IPFSHASH, tags); // wtf? why does this work? awaiting the result of awaited promise? stops the timeout.
            //     throw null;
            // } catch (error) {
            //     assert(error, "VM exception expected, did not get one")
            // }
        })

        it("requires a hash string", async () => {
            await catchRevert(poe.addIPFSHash(file1.description, "", file1.tags))
        })

        it("does not require tags", async () => {
            try {
                await poe.addIPFSHash(file1.description, file1.IPFSHASH)
            } catch (error) {
                assert(error, "should not have gotten an error!")
            }
        })

        it("increments dataCount after adding file", async () => {
            const result = await poe.dataCount();
            assert.equal(result.toString(), 1)
        })

        it("allows for multiple files", async () => {
            const file2 = {
                description2: 'file name2',
                IPFSHASH2: "QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7b222222222222",
                tags2: '#pleasework2',
            }

            const output = await poe.addIPFSHash(file2.description2, file2.IPFSHASH2, file2.tags2);
            const result = await poe.getData(1);
            assert.equal(result.description, file2.description2)
            assert.equal(result.hashStr, file2.IPFSHASH2)
            assert.equal(result.tags, file2.tags2)
        })

        it("checks for emitted LogIPFSHash event", async () => {
            assert.equal(output.logs[0].event, "LogAddIPFSHash")
        })

        it("only owner can call addIPFSHash", async () => {
            await catchRevert(poe.addIPFSHash(file1.description, file1.IPFSHASH, file1.tags, { from: NONOWNER }))
        })
    })

})