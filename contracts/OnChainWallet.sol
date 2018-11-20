pragma solidity ^0.4.23;

contract OnChainWallet {

    string public version = "0.0.1";
    int public approvementNr;
    address[] public owners;
    Request request;

    enum RequestStatus {PENDING, TRANSFERED}

    // Ether or token transfer request
    struct Request {
        address toAddress;
        uint amount;
        string assetType;
        int approvementNeeded;
        RequestStatus requestStatus;
        address[] voted;
    }

    // constructor
    constructor(int _approvementNr){
        approvementNr = _approvementNr;
        owners.push(msg.sender);
        // initializing request to default
        request = Request(
                msg.sender,
                0,
                "DFT",
                0,
                RequestStatus.TRANSFERED,
                new address[](0)
            );
    }
    
    // MODIFIERS
    modifier currentIsOwner() {
        bool containsCurrent = isOwner(msg.sender);
        assert(containsCurrent == true);
        _;
    }

    modifier requestPending() {
        require(request.requestStatus == RequestStatus.PENDING);
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

    // getting balance of the contract
    function balanceOf() view returns (uint){
        return address(this).balance;
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

    function getRequestAddress() view public returns (address toAddress) {
        toAddress = request.toAddress;
    }

    function getRequestAmount() view public returns (uint amount) {
        amount = request.amount;
    }

    function getRequestAssettype() view public returns (string assetType) {
        assetType = request.assetType;
    }

    function getRequestApprovementNeeded() view public returns (int approvementNeeded) {
        approvementNeeded = request.approvementNeeded;
    }

    function getRequestStatus() view public returns (uint requestStatus) {
        requestStatus = uint(request.requestStatus);
    }

    function getRequestInfo() view public returns (address toAddress,uint amount,string assetType, int approvementNeeded, uint requestStatus) {
        toAddress = request.toAddress;
        amount = request.amount;
        assetType = request.assetType;
        approvementNeeded = request.approvementNeeded;
        requestStatus = uint(request.requestStatus);
    }

    // start an ether transfer or a tranfer request
    function transferEtherRequest(address to, uint value) currentIsOwner() public {
        require(address(this).balance >= value);
        // transfer ether
        if (approvementNr == 1) {
            to.transfer(value);
        }
        // create request
        else {
            request = Request(
                to,
                value,
                "ETH",
                approvementNr,
                RequestStatus.PENDING,
                new address[](0)
            );
            request.voted.push(msg.sender);
        }
    }

    // adding approvement to a  request
    function etherRequestApprove() currentIsOwner() requestPending() public {
            if (alreadyVoted()){
                revert();
            }
            if (request.approvementNeeded < approvementNr - 1) {
                request.approvementNeeded = request.approvementNeeded + 1;
            }
            else {
                request.toAddress.transfer(request.amount);
                request.approvementNeeded =  request.approvementNeeded + 1; 
                request.requestStatus = RequestStatus.TRANSFERED;
            }
    }

    // checking if current address areaf
    function alreadyVoted() view internal returns (bool) {
        for (uint i = 0; i < request.voted.length; i ++){
            if (request.voted[i] == msg.sender ){
                return true;
            }
        }
        return false;
    }

}