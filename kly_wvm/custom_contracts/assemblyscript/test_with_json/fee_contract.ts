import {JSON} from "assemblyscript-json";



export function transferTokens(account:string, fee: i32):string {


    // Deserialize from JSON

    let parsedAccount: JSON.Obj = <JSON.Obj>(JSON.parse(account));

    let tokensBalance: JSON.Integer | null = parsedAccount.getInteger("tokensBalance")

    if(tokensBalance !== null){

        tokensBalance._num -= fee

    }

    return parsedAccount.stringify();

}
