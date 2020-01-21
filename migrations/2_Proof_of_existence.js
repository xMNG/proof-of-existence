const PoeFactory = artifacts.require("PoeFactory");

module.exports = function (deployer) {
    deployer.deploy(PoeFactory);
};
