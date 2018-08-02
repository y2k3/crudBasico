let Usuario=require("../models/Usuario");
//let express=require("express");
let mongoose=require("mongoose");



module.exports={

    nuevoUsuario:(req,res)=>{

                                console.log(req.body);
                                // creamos un esquema de usuario para almacenar los datos
                                let datos_usuario={
                                    id: req.body.id,
                                    Nombre:req.body.Nombre,
                                    Apellio:req.body.Apellio,
                                    Email:req.body.Email,
                                    Password:req.body.Password
                                }
                            
                            if(datos_usuario==="")
                            {
                                return res.send("Error al ingresar los datos");
                            }
                            else{
                                // inicianizamos el schema usuario con los datos enviados
                                let datos=new Usuario(datos_usuario);
                                datos.save((error)=>{
                                    if(error){
                                        return res.send(`error al almacenar los datos: ${error}`);
                                    }
                                    else{ 
                                        return res.send("Almacenamiento exitoso");
                                    }

                        });
                        
                    }
    
                        
                    },// termino funcion nuevo usuario
    getUsuarios: (req,res)=>{

                            //realizamos la busqueda en la bd
                            Usuario.find((err,datos_devolucion)=>{
                                if(err){return res.send("error al buscar en base de datos");}
                                if(datos_devolucion.length===0){res.send("no existen datos en bd");}
                                else{ return res.send({datos:datos_devolucion});}
                            });


    },// termino funcion obtener usuarios
    getUsuariobyId:(req,res)=>{
                            //obtenemos el id por parametros
                            
                            // preguntar porque no funciona req.params.IdUsuario??
                            
                            var id= req.params["IdUsuario"];
                            
                            //ocupamos findone (donde se pasa el key del json con el valor a comparar) en vez de findbyid (que compara con la key _id del json)
                            Usuario.findOne({id:id},(err,datos_devolucion)=>{
                                if(err){ 
                                    console.log(err);
                                    return res.send("error al realizar busqueda en bd");
                                }
                                if(!datos_devolucion)
                                {
                                    console.log("entro");
                                    console.log(datos_devolucion);
                                    return res.send(`No se encontro el id: ${id}`);
                                }
                                else
                                {
                                    return res.send({mensaje:datos_devolucion});
                                }
                            });
    }, // termino de funcion obtener usuarios por id
    deleteUsuario:(req,res)=>{
                            // obtenemos el id por parametro del url
                            let id=req.params.idUsuario;
                            // primero debemos buscar si el id de usuario existe en bd
                            console.log(id);
                            //consultamos por id en la bd
                            Usuario.find({id:id},(err,datos_devolucion)=>{
                                console.log(datos_devolucion);
                                if(err){
                                        return res.send("error al realizar la consulta en bd");
                                       }
                                // comprobamos si el arreglo esta vacio
                                if(datos_devolucion.length=== 0){return res.send("no se encontro en la base de datos");
                                    }
                                // si encontro datos al buscar procedemos a eliminar
                                else
                                {
                                    //obtenemos el _id q crea mongodb al insertar un nuevo documento
                                    var _id=datos_devolucion[0]['_id'];
                                    //eliminamos el documento
                                    Usuario.findByIdAndRemove(_id,(err)=>{
                                        if(err){return console.log("Error al eliminar");}
                                        else{ 
                                                console.log("eliminado exitosamente");
                                                return res.send({mensaje:"Eliminado Exitosamente"});
                                            }
                                    });
                                }
                            });

    },//termino funcion eliminar usuario
    UpdateUsuario: (req,res)=>{
        console.log("entro update");
        Usuario.findOne({id:req.body.id},(err,datos_devolucion)=>{
            if(err){ return res.send("no se encontro el usuario a actualizar");}
            else
            {
                    // debemos crear un objeto json del schema para actualizar
                    var update_usuario= new Usuario({
                        _id:datos_devolucion._id,
                        Nombre:req.body.Nombre,
                        Apellido:req.body.Apellido,
                        Email:req.body.Email,
                        Password:req.body.Password
                        });
                        console.log(update_usuario);
        
        
                        // procedemos a actualizar {parametros para comparar y buscar}
                        //{new:true} nos indica que la devolucion de datos es referente al documento actualizado
                        // si se quiere actualizar solo algun campo del documento ==> {$set:{campo:valor}}
                        Usuario.findOneAndUpdate({_id:update_usuario._id},update_usuario,{new:true},(err,usuario_actualizado)=>{
                            if(err){ return res.send("No se pudo actualizar error");}
                            else{ 
                                    console.log("actualizacion exitosa");
                                    return res.send({mensaje:usuario_actualizado});
                            }
                        });
            }
        })
        
        

    }// termino de funcion actualizar
}