var Wallet = artifacts.require("OnChainWallet");
var WalletInstance;
var version;
var isOwner;

contract('Wallet', function(accounts) {
    it("test of the Wallet contract: owner added", function() {
        return Wallet.deployed(1).then(function(instance) {
            WalletInstance = instance;
            return WalletInstance.version({from: accounts[0]});             
        }).then(function(result) {
            version = result;
            return WalletInstance.addOwner(accounts[1]);             
        }).then(function(result) {
            return WalletInstance.isOwner(accounts[1]);             
        }).then(function(result) {
            isOwner = result;
            assert.equal(isOwner, true, "newly added account is owner");                  
            assert.equal(version, "0.0.1", "version matching");      
        });
    });
});