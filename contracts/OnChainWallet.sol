pragma solidity ^0.4.23;

contract OnChainWallet {

    string public version = "0.0.1";
    int public approvementNr;
    address[] public owners;
    mapping(uint => Request) requests;
    uint public requestNum;

    enum RequestStatus {PENDING, TRANSFERED}

    struct Request {
        address toAddress;
        uint amount;
        string assetType;
        int approvementNeeded;
        RequestStatus requestStatus;
    }

    constructor(int _approvementNr){
        approvementNr = _approvementNr;
        owners.push(msg.sender);
        requestNum = 0;
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
    // checking if the address is an owner
    function isOwner(address _addressIsOwner) view returns (bool){
        bool containsCurrent = false;
        for (uint i = 0; i < owners.length; i++ ){
            if (owners[i] == msg.sender){
                containsCurrent = true;
            } 
        }
        return containsCurrent;
    }

    // adding an owner account
    function addOwner(address newOwner) currentIsOwner() {
        owners.push(newOwner);
    }

    // deleting an owner account
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

    // setting the required approvement limit
    function setRequiredApproverNr (int _newApproverNr) currentIsOwner()  public {
        require (_newApproverNr < 50);  
        approvementNr = _newApproverNr;
    }

    // TRANSFERRING FUNCTIONS
    // getting informaton regarding a request
    function getRequestInfo(uint requestNr) returns (address toAddress,uint amount,string assetType, int approvementNeeded, uint requestStatus) {
        toAddress = requests[requestNr].toAddress;
        amount = requests[requestNr].amount;
        assetType = requests[requestNr].assetType;
        approvementNeeded = requests[requestNr].approvementNeeded;
        requestStatus = uint(requests[requestNr].requestStatus);
    }

    // start an ether transfer or a tranfer request
    function transferEtherRequest(address to, uint value) currentIsOwner public returns (uint) {
        require(address(this).balance > value);
        // transfer ether
        if (approvementNr == 1) {
            to.transfer(value);
        }
        // create request
        else {
            Request memory request = Request(
                to,
                value,
                "ETH",
                approvementNr,
                RequestStatus.PENDING
            );
            requestNum = requestNum + 1;
            requests[requestNum] = request;
        }
    }

    // adding approvement to a  request
    function etherRequestApprove(uint requestNr) currentIsOwner public {
            Request memory request = requests[requestNr];
            if (request.approvementNeeded < approvementNr - 1) {
                requests[requestNr].approvementNeeded = requests[requestNr].approvementNeeded + 1;
            }
            else {
                request.toAddress.transfer(request.amount);
                requests[requestNr].approvementNeeded =  requests[requestNr].approvementNeeded + 1; 
                requests[requestNr].requestStatus = RequestStatus.TRANSFERED;
            }

    }

}