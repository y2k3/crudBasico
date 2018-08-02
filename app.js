let mongoose= require("mongoose");
let conexionBD= require("./conexionBD");
let server= require("./server");

// realizamos conexion a base de datos
mongoose.Promise=global.Promise;

mongoose.connect(conexionBD.bd,{useNewUrlParser:true},(error,response)=>{
    console.log(`hola----${conexionBD.bd}`);
    if(error)
    {
        return console.log("Error de conexion a base de datos");
    }
    else
    {
        server.listen(conexionBD.port,(error)=>{
            if(error){ console.log("No se pudo iniciar la API")}
            else{ console.log(`Server Corriento en puerto ${conexionBD.port}`)}
        });
    }

    });
