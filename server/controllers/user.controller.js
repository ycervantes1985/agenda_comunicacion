const {User} = require("../models/user.model")
const jwt = require("jsonwebtoken");

module.exports.Register = async(req,res) => {
    try{
        const user = new User (req.body);
        await user.save()

        const jwtToken = jwt.sign({_id:user._id},process.env.SECRET_KEY)

        return res.cookie("usertoken",jwtToken,process.env.SECRET_KEY,{httpOnly:true})
                .json({message:"",email:user.email, rol:user.rol,_id:user._id})
    }catch(err){
        res.json({message:"Algo salio mal",errors:err.errors});
    }
}

module.exports.Login = async(req,res) => {
    try{
        const user = await User.findOne({email:req.body.email});

        if(user===null){
            res.json({errors:{error:{message:"El usuario no existe en la base de datos"}}})
        }

        if(req.body.password!==user.password){
            res.json({errors:{error:{message:"La contraseña es incorrecta"}}})
        }

        const jwtToken = jwt.sign({id:user._id},process.env.SECRET_KEY);

        return res.cookie("usertoken",jwtToken,process.env.SECRET_KEY,{httpOnly:true})
        .json({message:"",email:user.email, rol:user.rol, _id:user._id})

    }catch(err){
        res.json({message:"Algo salio mal",errors:err.errors});
    }
}

module.exports.Logout = async(req,res) => {
    try{
        res.clearCookie("usertoken");
        res.json({success:true})
    }catch(err){
        return({success:false,data:err.message})
    }
}

module.exports.getAll = (request, response) => {
    User.find({})
      .then((users) => response.json(users))
      .catch((err) => response.json(err));
  };

module.exports.getUser = async(req,res) => {
    try{
        const {id}=req.params
        const {email,firstName,lastName,_id, rol} = await User.findById(id).exec();
        res.json({email,firstName,lastName,_id, rol})
    }catch(err){
        return{success:false,data:err.message}
    }
}

module.exports.addEstudianteComunicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const estudianteUpdated = await User.findByIdAndUpdate(id, {
            $push: {
                comunicaciones: req.body,                
            }
        }, { new: true });      

        res.json({ message: 'Se ha actualizado el estudiante', estudianteUpdated })
    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos actualizar',
            err
        });
    }
}

module.exports.addAllEstudianteComunicacion = async (req, res) => {
    try {
        const estudianteUpdated = await User.updateMany({ rol: "Estudiante"} , {
            $push: {
                comunicaciones: req.body,                
            }
        }, { new: true });      

        res.json({ message: 'Se ha actualizado el estudiante', estudianteUpdated })
    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos actualizar',
            err
        });
    }
}

module.exports.getComunicacionFromEstudiante = async (req, res) =>{
    try {
        const { id } = req.params;
        const estudiante = await User.findById(id).populate({
            path: 'comunicaciones'
            
        }).sort({createdAt:'desc'}).exec();
        
            res.json({ 
            message: 'Se ha conseguido estudiante',
            comunicaciones: estudiante.comunicaciones
        });

    } catch(err) {
        res.status(404).json({ 
            message: 'Ups no hemos podido conseguir el estudiante',
            err
        });
    }
}


module.exports.deleteEstudiante = async (req, res) => {
    try {
        const { id } = req.params;

        await User.deleteOne({ _id: id });
        res.json({ 
            message: 'Se ha eliminado el estudiante'
        })

    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos podido eliminar el estudiante',
            err
        })
    };
}

module.exports.getAllEstudiante = (request, response) => {
    User.find({ rol: "Estudiante"})
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
};



module.exports.getOneEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const estudiante = await User.find({_id:id})
            res.json({ 
            message: 'Se ha conseguido estudiante',
            estudiante: estudiante
        });

    } catch(error) {
        res.status(404).json({ 
            message: 'Ups no hemos podido conseguir el estudiante',
            error
        });
    }
};


module.exports.updateComunicacion = async (req, res) => {
    try {
        const { id  } = req.params;
        const estudianteUpdated = await User.updateOne({_id:id, 'comunicaciones._id':req.body._id}, {
            $set: {
                'comunicaciones.$.respuesta': req.body.respuesta, 
                
            }
        }, { new: true });      

        res.json({ message: 'Se ha actualizado el estudiante', estudianteUpdated })
    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos actualizar',
            err
        });
    }
}

module.exports.updateReadComunicacion = async (req, res) => {
    try {
        const { id  } = req.params;
        const estudianteUpdated = await User.updateOne({_id:id, 'comunicaciones._id':req.body._id}, {
            $set: {
                
                'comunicaciones.$.leido': req.body.leido,               
            }
        }, { new: true });      

        res.json({ message: 'Se ha actualizado el estudiante', estudianteUpdated })
    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos actualizar',
            err
        });
    }
}

module.exports.getOneComunicacionFromEstudiante = async (req, res) =>{
    
    try {
        console.log("request", req.body)
        console.log("idsss", req.params)
        const { id } = req.params;
        const estudiante = await User.find({_id:id})
            .select({comunicaciones : { $elemMatch : {'_id': req.body._id}}})                 
            res.json({ 
            message: 'Se ha conseguido una comunicacion',
            comunicacion:estudiante[0].comunicaciones[0]
        });

    } catch(error) {
        res.status(404).json({ 
            message: 'Ups no hemos podido conseguir el estudiante',
            error
        });
    }
}



