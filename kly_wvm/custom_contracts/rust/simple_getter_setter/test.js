import MOD from './pkg/simple_getter_setter.js';


setTimeout(()=>{

    let jsonedPoint = JSON.stringify(

        {
            alias1:"Hello",
            alias2:"KLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTARKLYNTAR",
            x:130,
            y:33
        
        }

    )

    let [resp,energyUsed1] = MOD.getHello(jsonedPoint);

    console.log('Response => ',resp,`(energy ${energyUsed1})`);
    

    
    // let [coordsSum,energyUsed2] = MOD.getCoordsSum(myObj);

    // console.log('CoordsSum ',coordsSum,`(energy ${energyUsed2})`);

    // let [myObj2,energyUsed3] = MOD.getObject("Cool",1337,777,"KLY");

    // console.log('Finally ',myObj2,`(energy ${energyUsed3})`);

},0)