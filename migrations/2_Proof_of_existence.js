const poe = artifacts.require("ProofOfExistence");

module.exports = function (deployer) {
    deployer.deploy(poe);
};
