var Wallet = artifacts.require("OnChainWallet");
var WalletInstance;
var version;
var approvementNrPre;
var approvementNrPost;


contract('Wallet', function(accounts) {
    it("test of the Wallet contract: approvement change", function() {
        return Wallet.deployed(1).then(function(instance) {
            WalletInstance = instance;
            return WalletInstance.version({from: accounts[0]});             
        }).then(function(result) {
            version = result;
            return WalletInstance.approvementNr({from: accounts[0]});
        }).then(function(result) {
            approvementNrPre = result;            
            return WalletInstance.setRequiredApproverNr(2,{from: accounts[0]});             
        }).then(function(result) {
            return WalletInstance.approvementNr({from: accounts[0]});
        }).then(function(result) {
            approvementNrPost = result;
            assert.equal(approvementNrPre, 1, "previously one approver");                  
            assert.equal(approvementNrPost, 2, "after update two approvers");                              
            assert.equal(version, "0.0.1", "version matching");      
        });
    });
});