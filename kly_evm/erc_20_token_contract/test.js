let BYTECODE_TO_DEPLOY = '' // paste code here from Remix - compile the erc20_token.sol from this directory

let ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initialAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]



import {Transaction} from '@ethereumjs/tx'
import {Common} from '@ethereumjs/common'
import Web3 from 'web3'


//___________________________________ CONSTANTS POOL ___________________________________


const web3 = new Web3('http://localhost:7332/kly_evm_rpc/shard_0')

// KLY-EVM
const common = Common.custom({name:'KLYNTAR',networkId:'0x1CA3',chainId:'0x1CA3'},{hardfork:'london'})

// EVM account

const evmAccount0 = {

    address:'0x4741c39e6096c192Db6E1375Ff32526512069dF5',
    privateKey:Buffer.from('d86dd54fd92f7c638668b1847aa3928f213db09ccda19f1a5f2badeae50cb93e','hex')

}




let DEPLOY_CONTRACT=async()=>{
    
    // let ERC20_CONTRACT = new web3.eth.Contract(ABI);
    
    // let PREPARED_TO_DEPLOY = ERC20_CONTRACT.deploy({
    
    //     data: `0x${BYTECODE_TO_DEPLOY}`

    // }).encodeABI()

    // console.log(PREPARED_TO_DEPLOY)
    
    
    web3.eth.getTransactionCount(evmAccount0.address,async(err,txCount)=>{
			
        if(err) return

        // Build a transaction
        let txObject = {

            from:evmAccount0.address,

            nonce:web3.utils.toHex(txCount),
    
            //Set enough limit and price for gas
            gasLimit: web3.utils.toHex(800000),
    
            gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
            
            //Set contract bytecode
            data:`0x${BYTECODE_TO_DEPLOY}`

        }


        //Choose custom network
        let tx = Transaction.fromTxData(txObject,{common}).sign(evmAccount0.privateKey)

        let raw = '0x' + tx.serialize().toString('hex')

        // console.log('Transaction(HEX) ———> ',raw)

        //Broadcast the transaction
        web3.eth.sendSignedTransaction(raw, (err, txHash) => console.log(err?`Oops,some has been occured ${err}`:`Success ———> ${txHash}`))


    })

}


// DEPLOY_CONTRACT()




let GET_TX_RECEIPT_TO_GET_CONTRACT_ADDRESS=async()=>{

    let receipt = await web3.eth.getTransactionReceipt('0x5a1292918fe3dd5c46c074a2b951eddf4b894d0bb84d8a69de0804fcd0b11569')

    console.log('Receipt is ',receipt)

}


// GET_TX_RECEIPT_TO_GET_CONTRACT_ADDRESS()


let GET_BALANCE=async()=>{

    let contractAddress = '0x580a8f649a9a6373240428ab868ce4a4209a6820'

    let ERC20_CONTRACT = new web3.eth.Contract(ABI,contractAddress);

    console.log(`Current balance for ${evmAccount0.address} is: `,await ERC20_CONTRACT.methods.balanceOf(evmAccount0.address).call())
    
}


// GET_BALANCE()




let TRANSFER_TOKENS=async()=>{

    // Params - to and amount

    const transferTo = `0xd24F99516c385A5C3D1Dc8c663B944A21D8F0145`;

	const transferAmount = web3.utils.toWei('300', 'ether');

	console.log(transferAmount)
	


	let ERC20_CONTRACT = new web3.eth.Contract(ABI);

	let contractAddress = '0x580a8f649a9a6373240428ab868ce4a4209a6820';


    web3.eth.getTransactionCount(evmAccount0.address,async(err,txCount)=>{
			
        if(err) return

        // Build a transaction
        let txObject = {

            from:evmAccount0.address,

            to: contractAddress,

            nonce:web3.utils.toHex(txCount),
    
            //Set enough limit and price for gas
            gasLimit: web3.utils.toHex(200000),
    
            gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
            
            data: ERC20_CONTRACT.methods.transfer(transferTo,transferAmount).encodeABI()

        }


        //Choose custom network
        let tx = Transaction.fromTxData(txObject,{common}).sign(evmAccount0.privateKey)


        let raw = '0x' + tx.serialize().toString('hex')

        console.log('Transaction(HEX) ———> ',raw)

        //Broadcast the transaction
        web3.eth.sendSignedTransaction(raw,(err,txHash) => console.log(err?`Oops,some has been occured ${err}`:`Success ———> ${txHash}`))


    })


}


TRANSFER_TOKENS()