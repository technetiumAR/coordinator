//Creamos el objeto JSON
var parkingJSON =
{ "device" :
   {
     "zigbeeId" : "123123123123",
     "measuresType" : "100.Parking",
     "timestamp" : new Date().toString(),
     "measures" :
     {
       "magnetic" :
       {
         "x" : 123,
         "y" : 123,
         "z" : 123
       },
       "temperatureRaw" : 123
     }
   }
 };

 console.log(JSON.stringify(parkingJSON));
