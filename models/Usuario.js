let mongoose= require("mongoose");

let Schema= mongoose.Schema; // inicializamos un esquema tipo mongodb

let UsuarioSchema= new Schema({
        id:{type:Number,unique:true,min:1},
        Nombre:{type:String},
        Apellido:{type:String},
        Email:{type:String,unique:true},
        Password:{type:String}
});

// aqui se pasa el Esquema creado ademas del nombre que se le asignara a la coleccion cuando se cree
module.exports=mongoose.model("Usuarios",UsuarioSchema);