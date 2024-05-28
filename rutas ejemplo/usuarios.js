const express = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = express.Router();
const {usuarioHttp}=require('../controllers/usuarios')
const {usuarioHelper}=require('../helpers/usuarios')

router.get('/',[
    validarJWT,
    validarCampos   
],usuarioHttp.usuarioGet);

router.post('/',[   
    // validarJWT, 
    check('email', 'El documento es obligatorio!').not().isEmpty(),
    check('email').custom( usuarioHelper.existeEmail ),
    check('password', 'Password no es válido').isLength({ min: 8}),
    validarCampos       
],    usuarioHttp.usuarioPost);
     

router.put('/activar/:id',[
    validarJWT, 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
],usuarioHttp.usuarioPutActivar);

router.put('/inactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(), 
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
],usuarioHttp.usuarioPutInactivar);

router.post("/login", [
    check("email","El documento es obligatorio").not().isEmpty(),
    check("password","La contraseña es obligatoria").not().isEmpty(),
    validarCampos
],   usuarioHttp.login);



module.exports={ router}