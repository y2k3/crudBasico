let express=require("express");
let crudUsuario=require("../controllers/CrudUsuario");
//let bodyParse=require("body-parser")
let api=express.Router(); // nos permite rediregir las rutas desde otro js



// crud

api.get("/TodosUsuarios",crudUsuario.getUsuarios);
// si agregas un * quiere decir que viene mas de un parametro
api.get("/UsuarioById/:IdUsuario*",crudUsuario.getUsuariobyId);
api.post("/NuevoUsuario",crudUsuario.nuevoUsuario);
api.delete("/EliminarUsuario/:idUsuario", crudUsuario.deleteUsuario);
api.put("/ActualizarUsuario",crudUsuario.UpdateUsuario);

module.exports=api;