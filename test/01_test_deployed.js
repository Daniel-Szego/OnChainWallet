var Wallet = artifacts.require("OnChainWallet");
var WalletInstance;
var version;
var approvementNr;

contract('Wallet', function(accounts) {
    it("test of the Wallet contract", function() {
        return Wallet.deployed(1).then(function(instance) {
            WalletInstance = instance;
            return WalletInstance.version({from: accounts[0]});             
        }).then(function(result) {
            version = result;
            return WalletInstance.approvementNr({from: accounts[0]});             
        }).then(function(result) {
            approvementNr = result;
            assert.equal(approvementNr, 1, "approvement number initialized to 1");                  
            assert.equal(version, "0.0.1", "version matching");      
        });
    });
});