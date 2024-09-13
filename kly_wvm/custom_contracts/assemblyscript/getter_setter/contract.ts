import {JSON} from "assemblyscript-json";



@external("klyntar","getFromState")
declare function getFromState(key: string): string;

@external("klyntar","setToState")
declare function setToState(key: string, value: string): void;



/*

    1) In parameter we receive object like {name:"NewName"} in JSON serialized form
    2) Get the object {name:"OldNameValue"} from state using <getFromState> function
    3) Using <setToState> function - set new value of .name field and store the whole object to state

*/
export function changeName(objWithNewName:string):void {

    // objWithNewName has format: {name:"NewNameValue"}

    let handlerWithNewName: JSON.Obj = <JSON.Obj>(JSON.parse(objWithNewName));

    let newPotentialName: JSON.Str | null = handlerWithNewName.getString("name");


    let handlerWithOldName: JSON.Obj = <JSON.Obj>(JSON.parse(getFromState("nameHandler")));

    let oldName: JSON.Str | null = handlerWithOldName.getString("name");


    if(newPotentialName !== null && newPotentialName !== oldName) {

        setToState("nameHandler",handlerWithNewName.stringify());

    }

}
