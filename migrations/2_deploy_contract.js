var Wallet = artifacts.require("./OnChainWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(Wallet,1);
};
