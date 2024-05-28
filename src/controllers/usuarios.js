

const Usuario = require("../models/usuarios")

const bcryptjs = require('bcryptjs');

const{generarJWT} = require('../middlewares/validar-Token'); 

const httpUsuarios = {
    getUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.find();
            res.json(usuarios);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getUsuariosXId: async (req, res) => {
        const {id}=req.params
        try {
            const usuario = await Usuario.findById(id)
            if (usuario)
                res.json({ usuario })
            else
                res.status(400).json({msg:"Usuario no encontrado"})
        } catch (error) {
            res.status(400).json({ error })
        }

    },
    getActivos: async (req, res) => {
        try {
            const usuarios = await Usuario.find({ estado: { $in: [0, 1] } }); // Fetch both active and inactive users
            const usuariosActivos = usuarios.filter(usuario => usuario.estado === 1); // Filter active users
            const usuariosInactivos = usuarios.filter(usuario => usuario.estado === 0); // Filter inactive users
            res.json({ usuariosActivos, usuariosInactivos });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    },
    postUsuarioInsertar: async (req, res) => {
        try {
            const { email, password } = req.body
            const usuario = new Usuario({ email, password })
            const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt)
            await usuario.save()
            res.json({ usuario })
        } catch (error) {
            res.status(400).json({ error: 'no se encuentra parametros' })
        }

    },
    postLogin: async (req, res) => {
      const { email, password } = req.body;
      try {
          const user = await Usuario.findOne({ email })
          if (!user) {
              return res.status(401).json({
                  msg: "Usuario / Password no son correctos"
              })
          }

          if (user.estado === 0) {
              return res.status(401).json({
                  msg: "Usuario / Password no son correctos"
              })
          }

          /////////pago o no pago    xxxxxxxx

          const validPassword = bcryptjs.compareSync(password, user.password);
          if (!validPassword) {
              return res.status(401).json({
                  msg: "Usuario / Password no son correctos"
              })
          }

          const token = await generarJWT(user._id);
          res.json({
              usuario: user,
              token
          })
      } catch (error) {
console.log(error);
          return res.status(500).json({
              msg: "Hable con el WebMaster"
          })
      }
  },
    putcambiarContraseña:async (req, res) => {
        const { id } = req.params;
        const { newPassword } = req.body;
        try {
            const usuario = await Usuario.findById(id);
            if (usuario) {
                const salt = bcryptjs.genSaltSync(10); // Genera una salt para hashear la contraseña
                const hashedPassword = bcryptjs.hashSync(newPassword, salt); // Hashea la nueva contraseña
                usuario.password = hashedPassword; // Guarda la contraseña hasheada en el usuario
                await usuario.save();
                res.json({ msg: "Contraseña actualizada correctamente" });
            } else {
                res.status(404).json({ msg: "Usuario no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

      putEditarUsuario: async (req, res) => {
        const { id } = req.params;
        const { email, password, estado } = req.body;
    
        try {
            const usuario = await Usuario.findById(id);
    
            if (!usuario) {
                return res.status(404).json({ msg: "Usuario no encontrado" });
            }
    
            if (usuario.estado !== 1) {
                return res.status(401).json({ msg: "Usuario inactivo" });
            }
    
            if (email) {
                usuario.email = email;
            }
    
            if (password) {
                const hashedPassword = bcryptjs.hashSync(password, 10);
                usuario.password = hashedPassword;
            }
    
            if (estado !== undefined) {
                usuario.estado = estado;
            }
    
            await usuario.save();
    
            res.json({ usuario });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
      putActivarUsuario: async (req, res) => {
        const { id } = req.params;
        try {
            const usuario = await Usuario.findById(id);
    
            if (!usuario) {
                return res.status(404).json({ msg: "Usuario no encontrado" });
            }
    
            if (usuario.estado === 1) {
                return res.status(400).json({ msg: "El usuario ya está activo" });
            }
            usuario.estado = 1; // Cambiar estado a activo
            await usuario.save(); // Guardar el usuario actualizado en la base de datos
            res.json({ msg: "Usuario activado correctamente", usuario });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
      putDesactivarUsuario: async (req, res) => {
        const { id } = req.params;
      
        const usuario = await Usuario.findById(id);
      
        if (!usuario) {
          return res.status(401).json({ msg: "Usuario no existe" });
        }
      
        if (usuario.estado === 0) {
          return res.status(401).json({ msg: "Usuario ya está inactivo" });
        }
      
        usuario.estado = 0;
        await usuario.save();
      
        res.json({ usuario });
      }
}

module.exports = { httpUsuarios };

    // postLogin: async(req,res)=>{
    //     const {email,password}= req.body
    //     const usuario= await Usuario.find({email,password})
    //     if (usuario){
    //         if(usuario.estado==1)
    //             res.json({usuario})
    //         else
    //             res.status(401).json({msg:"Usuario Inactivo"})

    //     }else{
    //         res.status(401).json({msg:"Usuario no existe"})
    //     }  //heceho por instructor
    // },
//     postLogin: async (req, res) => {
//         try {
//             const { email, password } = req.body;
//             const usuario = await Usuario.findOne({ email, password });

//             if (usuario) {
//                 if (usuario.estado === 1) {
//                     res.json({ usuario });
//                 } else {
//                     res.status(401).json({ msg: "Usuario Inactivo" });
//                 }
//             } else {
//                 res.status(401).json({ msg: "Usuario no encontrado" });
//             }
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// }
    
    // posteditarusuario: async (req, res) => {
    //     try {
    //         const { email, oldPassword, newPassword } = req.body;
    
    //         // Find the user by email
    //         const usuario = await Usuario.findOne({ email });
    
    //         // Check if the user exists
    //         if (!usuario) {
    //             return res.status(404).json({ error: 'Usuario no encontrado' });
    //         }
    
    //         // Check if the old password matches the stored password
    //         if (oldPassword !== usuario.password) {
    //             return res.status(400).json({ error: 'La contraseña antigua no es correcta' });
    //         }
    
    //         // Update the password
    //         usuario.password = newPassword;
    //         await usuario.save();
    
    //         res.json({ mensaje: 'Contraseña cambiada exitosamente' });
    //     } catch (error) {
    //         res.status(500).json({ error: 'Error al cambiar la contraseña' });
    //     }
    // }
    









    // getUsuariosXId: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const usuario = await Usuario.findById(id);
    //         if (usuario) {
    //             res.json({ usuario });
    //         } else {
    //             throw new Error("Usuario no encontrado");
    //         }
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // },
    // getUsuariosXId: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const usuario = await Usuario.findById(id);
    //         if (usuario) {
    //             res.json({ usuario });
    //         } else {
    //             throw new Error("Usuario no encontrado");
    //         }
    //     } catch (error) {
    //         console.error("Error en la consulta MongoDB:", error);
    //         res.status(400).json({ error: error.message });
    //     }
    // },
    // getactivos: async (req, res) => {
    //     try {
    //         const usuariosActivos = await Usuario.find({ estado: 1 });
    //         const usuariosInacktivos = await Usuario.find({ estado: 0 });
    //         res.json({ usuariosActivos, usuariosInactivos });
    //     } catch (error) {
    //         res.status(500).json({ error: 'Error al obtener usuarios' });
    //     }
    // },