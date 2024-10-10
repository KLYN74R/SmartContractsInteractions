import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs';


let contractBytecode = fs.readFileSync('./contract.wasm');


// console.log(contractBytecode.toString('hex'));



const meteredWasmBytecode = metering.meterWASM(contractBytecode,{meterType: 'i64'})

const limit = BigInt(20_000_000)

let gasUsed = BigInt(0)


let contractState = new Map()

// State imitation
contractState.set("nameHandler",{name:"Name_1"})


let meteredContract = await loader.instantiate(meteredWasmBytecode,{
    'metering': {
      'usegas': (gas) => {  

        gasUsed += gas
        if (gasUsed > limit) {
          throw new Error('out of gas!')
        }
      }
    },

    'klyntar':{

      getFromState:key=>{
        
        let keyValue = meteredContract.exports.__getString(key);
        
        return meteredContract.exports.__newString(JSON.stringify(contractState.get(keyValue)));

      },

      setToState:(key,value)=>{

        let keyValue = meteredContract.exports.__getString(key);
    
        let valueValue = meteredContract.exports.__getString(value);
            
        contractState.set(keyValue,valueValue);

      },

    }

});


let handlerWithNewName = {name:"Name_2"}

let stringifiedHandler = meteredContract.exports.__newString(JSON.stringify(handlerWithNewName))

// Make call

console.log('Initial value in state => ',contractState.get("nameHandler"));

let returnedValue = meteredContract.exports.__getString(meteredContract.exports.changeName(stringifiedHandler));

console.log('Returned value is => ',returnedValue);


console.log('Gas spent => ',gasUsed);

console.log('New value in state => ',contractState.get("nameHandler"));