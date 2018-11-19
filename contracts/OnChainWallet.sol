pragma solidity ^0.4.23;

contract OnChainWallet {

    string public version = "0.0.1";
    int public approvementNr;
    address[] public owners;

    constructor(int _approveentNr){
        approvementNr = _approveentNr;
        owners.push(msg.sender);
    }
    
    // MODIFIERS
    modifier isOwner() {
        bool containsCurrent = false;
        for (uint i = 0; i < owners.length; i++ ){
            if (owners[i] == msg.sender){
                containsCurrent = true;
            }
        }
        assert(containsCurrent == true);
        _;
    }

    // FUNCTIONS
    function addOwner(address newOwner) isOwner() {
        owners.push(newOwner);
    }

    function deleteOwner(address newOwner) isOwner() {
        int indexToDelete = -1;
        for (uint i = 0; i < owners.length; i++ ){
            if (owners[i] == msg.sender){
                indexToDelete = int(i);
            }
        }
        if (indexToDelete > -1) {
            delete owners[uint(indexToDelete)];
        }
    }

}