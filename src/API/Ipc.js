import Web3 from 'web3'
var net = require('net');
//let _ipc = window.__require ? window.__require('ipc') : {}
let _ipc = new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)

/*
export default class IPC{
   // TODO use whitelist for valid commands or provide functions instead
   static send(msg, args){
     _ipc.send(msg, args)
   } 
}
*/

export default _ipc