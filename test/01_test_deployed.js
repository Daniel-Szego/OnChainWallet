var Wallet = artifacts.require("OnChainWallet");
var WalletInstance;
var version;

contract('Wallet', function(accounts) {
    it("test of the Wallet contract", function() {
        return Wallet.deployed(10, 100).then(function(instance) {
            WalletInstance = instance;
            return WalletInstance.version({from: accounts[0]});             
        }).then(function(result) {
            version = result;
            assert.equal(version, "0.0.1", "version matching");      
        });
    });
});