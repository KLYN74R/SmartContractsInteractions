use serde::{Serialize, Deserialize};
use wasm_bindgen::prelude::*;
use serde_json;




#[wasm_bindgen]
extern "C" {

    #[wasm_bindgen(js_namespace = klyntar)]
    fn accept_jsoned_value_and_log(_:&str)->String;

}


#[derive(Serialize, Deserialize, Debug)]
struct Point {
    alias1: String,
    alias2: String,
    x: i32,
    y: i32,
}



#[wasm_bindgen]
pub fn getHello(jsoned_point:&str)->String{

    // Convert the JSON string back to a Point and return concatenated value
    
    let deserialized: Point = serde_json::from_str(jsoned_point).unwrap();
    
    let value: String = accept_jsoned_value_and_log(&deserialized.alias2);

    format!("Hello to {} AND {}", deserialized.alias1, value)

}


#[wasm_bindgen]
pub fn getAliasConcat(jsoned_point:&str)->String{

    // Convert the JSON string back to a Point and return concatenated value
    
    let deserialized: Point = serde_json::from_str(jsoned_point).unwrap();

    format!("{} AND {}", deserialized.alias1, deserialized.alias2)

}