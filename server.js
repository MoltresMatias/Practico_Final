const http = require('http');
const app = require('./app');   // importás el app ya configurado
const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
