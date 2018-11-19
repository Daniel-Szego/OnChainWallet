# Multifunction and multitoken on-chain wallet based on Ethereum

 implemented in solidity

USE CASE - create wallet for N of M approvement:

1. Create OnChainWallet either with input parameter N

2. Or after the cration of the wallet call the setRequiredApproverNr with N

3. Call addOwner M times adding the M different owners

4. Call transferEtherRequest to initiate an ether request. If N is 1 the transfer will be executed without delay, otherwise approvement will be required for the transfer.

5. Call etherRequestApprove N times from N different accounts to approve the transfer.

6. The ether transfer should be excuted.  




