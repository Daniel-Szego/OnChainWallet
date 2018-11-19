var Wallet = artifacts.require("OnChainWallet");
var WalletInstance;
var WalletBalancePre;
var WalletBalancePost;

contract('Wallet', function(accounts) {
    it("test of the Wallet contract", function() {
        return Wallet.deployed(1).then(function(instance) {
            WalletInstance = instance;
            WalletInstance.sendTransaction({from:accounts[0],value:1000000000000000000})
        }).then(function(result) {
            return WalletInstance.balanceOf({from: accounts[0]});             
        }).then(function(result) {
            WalletBalancePre = result;
            return WalletInstance.transferEtherRequest(accounts[0], 500000000000000000, {from: accounts[0]});             
        }).then(function(result) {
            return WalletInstance.balanceOf({from: accounts[0]});             
        }).then(function(result) {
            WalletBalancePost = result;       
            assert.equal(WalletBalancePre, 1000000000000000000, "wallet balance set");                  
            assert.equal(WalletBalancePost, 500000000000000000, "wallet balance null");                              
        });
    });
});