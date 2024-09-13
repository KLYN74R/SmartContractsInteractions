import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs';


let wasmTarget = fs.readFileSync('./target_2.wasm');

let wasmFeeContract = fs.readFileSync('./fee_contract.wasm');




const meteredWasm = metering.meterWASM(wasmTarget,{
    meterType: 'i32'
})


const limit = 20_000_000
let gasUsed = 0

let wasmTargetMetered = await loader.instantiate(meteredWasm,{
    'metering': {
      'usegas': (gas) => {
        gasUsed += gas
        if (gasUsed > limit) {
          throw new Error('out of gas!')
        }
      }
    }

});

let object = {name:"Vlad", age: 21, balance: 100000}  

let wasmedObject = wasmTargetMetered.exports.__newString(JSON.stringify(object))

let targetContractCallResult = wasmTargetMetered.exports.changeName(wasmedObject);
  
let strTargetValue = wasmTargetMetered.exports.__getString(targetContractCallResult);


console.log(strTargetValue);
  
console.log('Gas spent => ',gasUsed);



// let wasmFeeContractLoaded  = await loader.instantiate(wasmFeeContract,{});

// let contractObject = {name:"Vlad", tokensBalance: 10000000000000}

// let wasmedContractObject = wasmFeeContractLoaded.exports.__newString(JSON.stringify(contractObject))

// let feeContractCallResult = wasmFeeContractLoaded.exports.transferTokens(wasmedContractObject,gasUsed);
  
// let strFeeValue = wasmFeeContractLoaded.exports.__getString(feeContractCallResult);

// console.log(strFeeValue)