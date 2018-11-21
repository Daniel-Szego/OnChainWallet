var Wallet = artifacts.require("OnChainWallet");
var WalletInstance;
var requestNr;
var WalletBalancePre;
var WalletBalancePost;
var approvementNr;

contract('Wallet', function(accounts) {
    it("test of the Wallet contract: two times same approvement", function() {
        return Wallet.deployed(1).then(function(instance) {
            WalletInstance = instance;
            WalletInstance.sendTransaction({from:accounts[0],value:1000000000000000000})
        }).then(function(result) {
            return WalletInstance.version({from: accounts[0]});             
        }).then(function(result) {
            version = result;
            return WalletInstance.balanceOf({from: accounts[0]});             
        }).then(function(result) {
            WalletBalancePre = result;            
            return WalletInstance.setRequiredApproverNr(2,{from: accounts[0]});             
        }).then(function(result) {
            return WalletInstance.approvementNr({from: accounts[0]});             
        }).then(function(result) {    
            approvementNr = result;
            return WalletInstance.addOwner(accounts[1]);             
        }).then(function(result) {            
            return WalletInstance.transferEtherRequest(accounts[0], 500000000000000000, {from: accounts[0]});             
        }).catch(function(error) {
                errorMessage = error.toString();
                if (errorMessage.indexOf("revert")  > 0){
                    assert(true, "Can not vote in Init state - error as expected");   
                }
                else{
                    assert(false, "Can not vote in Init state - wrong error message");   
                }
         });            
    });
});