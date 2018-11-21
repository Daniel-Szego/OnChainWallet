
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
    
    var TestTokenAddress = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";
    var TestTokenContract = web3.eth.contract(TestTokenABI).at(TestTokenAddress);
    var fromAddress;

    refreshVisibility();  

    $("#transferEtherButton").click(function(){
        transferEther();
     });

     $("#approveActiveRequestButton").click(function(){
      approveActiveRequest();
     });

     $("#setApprovementNrButton").click(function(){
      setApprovementNr();
     });

     $("#addOwnerButton").click(function(){
      addOwner();
     });


     //UI

    function refreshVisibility(){
      $("#TTContractAddress").text(TestTokenAddress);
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
          console.log(error);
      }
      });
    }

    function getEtherBalance(account){
      var balance = web3.eth.getBalance(TestTokenAddress, function (error, result) {
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
          console.log(error);
      }
      });
    }

    function getReqestAmount(){
      var requestAmount = TestTokenContract.getRequestAmount(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTRequestAmount").text(value);          
      } else {
          console.log(error);
      }
      });
    }

    function getRequestAssetType(){
      var requestAssetType = TestTokenContract.getRequestAssettype(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTRequestAssetType").text(value);          
      } else {
          console.log(error);
      }
      });
    }

    function getRequestApprovementNr(){
      var requestApprovementNr = TestTokenContract.getRequestApprovementNeeded(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTRequestApprovementNr").text(value);          
      } else {
          console.log(error);
      }
      });
    }

    function getRequestStatus() {
      var requestStatus = TestTokenContract.getRequestStatus(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTRequestStatus").text(value);          
      } else {
          console.log(error);
      }
      });
    }

    function transferEther() {
      var toAddress = $("#TTTransferEtherAddress").val();
      var amount = $("#TTTransferEtherAmount").val();

      var requestStatus = TestTokenContract.transferEtherRequest(toAddress, amount, function(error, value) {
        if (!error) {
          alert("Transfer has been succeeded");
      } else {
          console.log(error);
      }
      });
    }

    function approveActiveRequest() {
      
      var requestStatus = TestTokenContract.etherRequestApprove(function(error, value) {
        if (!error) {
          alert("Approve has been succeeded");
        } else {
          console.log(error);
      }
      });
    }

    function setApprovementNr() {
      var approvementNr = $("#TTApprovementNr").val();
      var requestStatus = TestTokenContract.setRequiredApproverNr(approvementNr,function(error, value) {
        if (!error) {
          alert("Set has been succeeded");
        } else {
          console.log(error);
      }
      });
    }

    function addOwner() {
      var approvementAddress = $("#TTApprovementAddress").val();
      var requestStatus = TestTokenContract.addOwner(approvementAddress, function(error, value) {
        if (!error) {
          alert("Adding owner has been succeeded");
        } else {
          console.log(error);
      }
      });
    }

