var app = require('./src/app');
var port = process.env.PORT || 1042;
const mongoose = require('mongoose');


async function init(){
  console.log("Conectando a base de datos Musify...")
  let connection =  await mongoose.connect('mongodb://localhost:27017/Musify');

  if(connection){
    console.log('Conexión a la base Musify correctamente. Puerto 27017');
    app.listen(port, ()=>{
    console.log("API Rest - Musify ejecutandose en http://localhost:"+port)
    })
  }else{
    console.error('Error conectando a la base Musify:', error.message);
  }      
}

init();