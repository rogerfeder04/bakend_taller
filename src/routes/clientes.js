const express = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
const router = express.Router();

const { httpClientes } = require("../controllers/clientes");
const {clienteHelper}=require('../helpers/clientes')

const { validarJWT } = require('../middlewares/validar-Token');
const jwt = require('jsonwebtoken');

router.get("/listar_todos",[validarJWT],httpClientes.getlistartodos)  //listar todo

router.get("/listar/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(clienteHelper.existeClienteID),
    validarCampos
],httpClientes.getlistarid) //listar por id


router.get("/listar_activos",[
    validarJWT
],httpClientes.getlistaractivos)//listar activos listar inactivos


router.post("/ingresar_cliente",[
    validarJWT,
    check('nombre', 'El documento es obligatorio!').not().isEmpty(),
    check('direccion', 'El documento es obligatorio!').not().isEmpty(),
    check('telefono', 'El documento es obligatorio!').not().isEmpty().isNumeric(),
    check('email').custom( clienteHelper.existeEmail ),
    check('documento').custom( clienteHelper.existeDocumento),
    validarCampos
],httpClientes.postInsertar)//insertar


router.put("/modificarCliente/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(clienteHelper.existeClienteID),
    check('nombre', 'El documento es obligatorio!').not().isEmpty(),
    check('nombre').custom(clienteHelper.existenombrecliente),
    check('direccion', 'El documento es obligatorio!').not().isEmpty(),
    check('telefono', 'El documento es obligatorio!').not().isEmpty().isNumeric(),
    check('email').custom( clienteHelper.existeEmail ),
    check('documento').custom( clienteHelper.existeDocumento),
    validarCampos
],httpClientes.putModificar) //modificar cliente

router.put("/activarCliente/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(clienteHelper.existeClienteID),
    validarCampos
],httpClientes.putActivar) //activar

router.put("/desactivarCliente/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(clienteHelper.existeClienteID),
    validarCampos
],httpClientes.putDesactivar)//desactivar


module.exports=router;




