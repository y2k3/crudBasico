let express= require("express");
let bodyParser=require("body-parser");
let rutas=require("./routes/rutas");

let server= express();// inicializamos express

// usos de middlawares
server.use(bodyParser.urlencoded({extended:false}));
// indicamos que las respuestas sean en json
server.use(bodyParser.json());
// carpeta statica para el manejo de imagen y demas
server.use("/public", express.static("public"));

// usamos un middleware para acceder a las rutas

server.use("/api",rutas);
// exportamos la constante server
module.exports=server;

