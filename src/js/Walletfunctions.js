
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
        "inputs": [],
        "name": "to",
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
        "constant": true,
        "inputs": [],
        "name": "owner",
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
        "name": "votingState",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "winnerValue",
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
        "name": "from",
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
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "blindVotes",
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
            "name": "_from",
            "type": "int256"
          },
          {
            "name": "_to",
            "type": "int256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "VotingStarted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "CountingStarted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "result",
            "type": "int256"
          }
        ],
        "name": "VotingClosed",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "startVotingRound",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "startCountingRound",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "finishVoting",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "blindVote",
            "type": "string"
          }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "vote",
            "type": "int256"
          },
          {
            "name": "salt",
            "type": "string"
          }
        ],
        "name": "revealVote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "source",
            "type": "string"
          }
        ],
        "name": "stringToBytes32",
        "outputs": [
          {
            "name": "result",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    
    var TestTokenAddress = "0xcfed223fab2a41b5a5a5f9aaae2d1e882cb6fe2d";
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
      var votingState = getVotingState();
      var votingFrom = getVotingFrom();
      var votingTo = getVotingTo();
      var winner = getWinner();

      $("#TTAddress").text(account);
    }


    // Ethereum services

    // READ
    function getAccountAddress(){
      var account = web3.eth.accounts[0];
      fromAddress = account;
      return account;
    }
    
    function getVotingState(){
      var votingState = TestTokenContract.votingState.call(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTVoting").text(value);          
      } else {
          console.log(err);
      }
      });
    }

    function getVotingFrom(){
      var from = TestTokenContract.from.call(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTfrom").text(value);
        } else {
          console.log(err);
      }}
      );
    }

    function getVotingTo(){
      var to = TestTokenContract.to.call(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTto").text(value);
        } else {
          console.log(err);
      }});
    }

    function getWinner() {
      var winnerValue = TestTokenContract.winnerValue.call(function(error, value) {
        if (!error) {
          console.log('success');
          $("#TTWinner").text(value);      
        } else {
          console.log(err);
      }});
    }

    //WRITE
    function vote(){
      var value = $("#TTVoteNr").val();
      var salt = $("#TTVoteSalt").val();
      var hash = sha256(value.toString() + salt);

      var retVal = TestTokenContract.vote(hash,
        function(error, result){
        if (!error){
          alert("Vote has been succeeded");
        } else {
          console.log(error);
        }
      }); 
    }

    function revealVote(){
      var value = $("#TTRevealVoteNr").val();
      var salt = $("#TTRevealVoteSalt").val();

      var retVal = TestTokenContract.revealVote(value,salt,
        function(error, result){
        if (!error){
          alert("Vote has been succeeded");
        } else {
          console.log(error);
        }
      }); 
    }

    function startVoting() {

      var retVal =  TestTokenContract.startVotingRound( 
        function(error, result){
        if (!error){
          alert("success");       
        } else {
          console.log(error);
        }
      });
    }

    function startCounting(){

      var retVal =  TestTokenContract.startCountingRound( 
        function(error, result){
        if (!error){
          alert("success");       
        } else {
          console.log(error);
        }
      });

    }

    function finishVote(){

      var retVal =  TestTokenContract.finishVoting( 
        function(error, result){
        if (!error){
          alert("success");       
        } else {
          console.log(error);
        }
      });

    }
