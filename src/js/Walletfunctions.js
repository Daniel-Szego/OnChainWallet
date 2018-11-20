
    // set the provider you want from Web3.providers
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      web3js = new Web3(web3.currentProvider);
    } else {
      //web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545/"));
    }

    var TestTokenABI = [
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "owners",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "approvementNr",
        "outputs": [
          {
            "name": "",
            "type": "int256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "version",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_approvementNr",
            "type": "int256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_addressIsOwner",
            "type": "address"
          }
        ],
        "name": "isOwner",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "addOwner",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "deleteOwner",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_newApproverNr",
            "type": "int256"
          }
        ],
        "name": "setRequiredApproverNr",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getRequestAddress",
        "outputs": [
          {
            "name": "toAddress",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getRequestAmount",
        "outputs": [
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getRequestAssettype",
        "outputs": [
          {
            "name": "assetType",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getRequestApprovementNeeded",
        "outputs": [
          {
            "name": "approvementNeeded",
            "type": "int256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getRequestStatus",
        "outputs": [
          {
            "name": "requestStatus",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getRequestInfo",
        "outputs": [
          {
            "name": "toAddress",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          },
          {
            "name": "assetType",
            "type": "string"
          },
          {
            "name": "approvementNeeded",
            "type": "int256"
          },
          {
            "name": "requestStatus",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferEtherRequest",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "etherRequestApprove",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    
    var TestTokenAddress = "0xf204a4ef082f5c04bb89f7d5e6568b796096735a";
    var TestTokenContract = web3.eth.contract(TestTokenABI).at(TestTokenAddress);
    var fromAddress;

    refreshVisibility();  

    $("#voteButton").click(function(){
        vote();
     });

     $("#revealVoteButton").click(function(){
      revealVote();
     });

     $("#startVoting").click(function(){
      startVoting();
     });

     $("#startCounting").click(function(){
      startCounting();
     });

     $("#finishVote").click(function(){
      finishVote();
     });

     //UI

    function refreshVisibility(){
      var account = getAccountAddress();
      getApprovementNr();
      getEtherBalance(account);
      getRequestAddress();
      getReqestAmount();
      getRequestAssetType();
      getRequestApprovementNr();
      getRequestStatus();
    }


    // Ethereum services

    // READ
    function getAccountAddress(){
      var account = web3.eth.accounts[0];
      fromAddress = account;
      $("#TTAddress").text(account);      
      return account;
    }
    
    function getApprovementNr(){
      var votingState = TestTokenContract.approvementNr.call(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTApprovement").text(value);          
      } else {
          console.log(err);
      }
      });
    }

    function getEtherBalance(account){
      var balance = web3.eth.getBalance(account, function (error, result) {
        if (error) {
          console.log(error);
        } else {
          $("#TTBalanceEther").text(result);            
        }
      });       
    }

    function getRequestAddress() {
      var requestAddress = TestTokenContract.getRequestAddress(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTRequestAddress").text(value);          
      } else {
          console.log(err);
      }
      });
    }

    function getReqestAmount(){
      var requestAmount = TestTokenContract.getRequestAmount(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTRequestAmount").text(value);          
      } else {
          console.log(err);
      }
      });
    }

    function getRequestAssetType(){
      var requestAssetType = TestTokenContract.getRequestAssettype(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTRequestAssetType").text(value);          
      } else {
          console.log(err);
      }
      });
    }

    function getRequestApprovementNr(){
      var requestApprovementNr = TestTokenContract.getRequestApprovementNeeded(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTRequestApprovementNr").text(value);          
      } else {
          console.log(err);
      }
      });
    }

    function getRequestStatus() {
      var requestStatus = TestTokenContract.getRequestStatus(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTRequestStatus").text(value);          
      } else {
          console.log(err);
      }
      });
    }