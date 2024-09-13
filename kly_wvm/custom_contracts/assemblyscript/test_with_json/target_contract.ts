import {JSON} from "assemblyscript-json";


/*

    Change name

*/
export function changeName(account:string):string {


    // Deserialize from JSON

    let parsedAccount: JSON.Obj = <JSON.Obj>(JSON.parse(account));

    let currentName: JSON.Str | null = parsedAccount.getString("name")

    if(currentName !== null){

        currentName._str = currentName._str+' & Student'

    }

    return parsedAccount.stringify();

}
