var app = require('./src/app');
var port = process.env.PORT || 1042;
const mongoose = require('mongoose');

async function init(){
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Musify';
    console.log("Conectando a base de datos Musify en:", mongoUri);

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Conexión a la base Musify correctamente.');
    app.listen(port, () => {
      console.log("API Rest - Musify ejecutándose en http://localhost:" + port);
    });

  } catch (error) {
    console.error('Error conectando a la base Musify:', error.message);
    process.exit(1);
  }
}

init();