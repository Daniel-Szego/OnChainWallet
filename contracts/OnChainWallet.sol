pragma solidity ^0.4.23;

contract OnChainWallet {

    string public version = "0.0.1";
    int public approvementNr;
    address[] public owners;
    mapping(uint => Request) requests;

    enum RequestStatus {PENDING, TRANSFERED}

    struct Request {
        address toAddress;
        uint amount;
        string assetType;
        uint approvementNeeded;
        RequestStatus requestStatus;
    }

    constructor(int _approveentNr){
        approvementNr = _approveentNr;
        owners.push(msg.sender);
    }
    
    // MODIFIERS
    modifier currentIsOwner() {
        bool containsCurrent = isOwner(msg.sender);
        assert(containsCurrent == true);
        _;
    }

    // FALLBACK
    function () public payable {}  

    // FUNCTIONS
    function isOwner(address _addressIsOwner) view returns (bool){
        bool containsCurrent = false;
        for (uint i = 0; i < owners.length; i++ ){
            if (owners[i] == msg.sender){
                containsCurrent = true;
            } 
        }
        return containsCurrent;
    }


    function addOwner(address newOwner) currentIsOwner() {
        owners.push(newOwner);
    }

    function deleteOwner(address newOwner) currentIsOwner() {
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

    function getRequestInfo(uint requestNr) returns (address toAddress,uint amount,string assetType, uint approvementNeeded, uint requestStatus) {
        toAddress = requests[requestNr].toAddress;
        amount = requests[requestNr].amount;
        assetType = requests[requestNr].assetType;
        approvementNeeded = requests[requestNr].approvementNeeded;
        requestStatus = uint(requests[requestNr].requestStatus);
    }

    function transferEtherRequest(address to, uint value) currentIsOwner public returns (uint) {

    }

    function etherRequestApprove(uint requestNr) currentIsOwner public {

    }

}