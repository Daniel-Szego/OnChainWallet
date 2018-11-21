var Wallet = artifacts.require("OnChainWallet");
var WalletInstance;
var requestNr;
var WalletBalancePre;
var WalletBalancePost;
var approvementNr;

contract('Wallet', function(accounts) {
    it("test of the Wallet contract: two approvements", function() {
        return Wallet.deployed(1).then(function(instance) {
            WalletInstance = instance;
            WalletInstance.sendTransaction({from:accounts[0],value:1000000000000000000})
        }).then(function(result) {
            return WalletInstance.version({from: accounts[0]});             
        }).then(function(result) {
            version = result;
            console.log("version" + result);
            return WalletInstance.balanceOf({from: accounts[0]});             
        }).then(function(result) {
            WalletBalancePre = result;            
            console.log("wallet balance before" + result);            
            return WalletInstance.setRequiredApproverNr(2,{from: accounts[0]});             
        }).then(function(result) {
            console.log("approvement set");
            return WalletInstance.approvementNr({from: accounts[0]});             
        }).then(function(result) {    
            approvementNr = result;
            console.log("approvement number" + approvementNr);            
            return WalletInstance.addOwner(accounts[1]);             
        }).then(function(result) {            
            console.log("owner added");                        
            return WalletInstance.transferEtherRequest(accounts[0], 500000000000000000, {from: accounts[0]});             
        }).then(function(result) {
            console.log("transferEtherRequested");    
            return WalletInstance.etherRequestApprove({from: accounts[1]});             
        }).then(function(result) {
            console.log("transferEtherApproved");                
            return WalletInstance.balanceOf({from: accounts[0]});             
        }).then(function(result) {
            WalletBalancePost = result;       
            assert.equal(version, "0.0.1", "version number check");                                          
            assert.equal(approvementNr.toNumber(), 2, "2 approvements are needed");                              
            assert.equal(WalletBalancePre.toNumber(), 1000000000000000000, "wallet balance set");                  
            assert.equal(WalletBalancePost.toNumber(), 500000000000000000, "wallet balance null");                              
        });
    });
});