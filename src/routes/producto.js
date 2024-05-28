const express = require("express");
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const router = express.Router();
 

const { httpProducto } = require("../controllers/producto");
//importo las carpetas de http //
const {productoHelper}=require('../helpers/producto');
const {usuarioHelper}=require('../helpers/usuarios');
const { validarJWT } = require("../middlewares/validar-Token");
const jwt = require('jsonwebtoken');

router.get("/listarproduc",[validarJWT], httpProducto.getProducto);//listar todo

router.get("/listarproduc/:id",[validarJWT,
    check('producto', 'El producto es obligatorio!').isMongoId(),
    check('producto').custom (productoHelper.existeProductoID),
], httpProducto.getProductoId);//listar por id


router.get("/listastockproduc",[validarJWT], httpProducto.getProductosBajoStock) //listar todos los productos por debajo de stock minimo

router.get("/listapreciomayor", httpProducto. getpreciomayor) //listar todos los articulos por encima del precio xxx.

router.get("/productactivos",[validarJWT],httpProducto.getListaactivos)//listar activos listar inactivos
router.get("/productinactivos",[validarJWT],httpProducto.getListainactivos)//listar activos listar inactivos

router.post("/insertarproducto",[
    validarJWT,
    check('usuario', 'El usuario es obligatorio!').isMongoId(),
    check('usuario').custom (usuarioHelper.existeUsuarioID),
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('nombre').custom (productoHelper.existeNombre),

    check('precio', 'El documento es obligatorio!').not().isEmpty().isNumeric(),
    check('cantidad', 'El documento es obligatorio!').not().isEmpty().isNumeric(),
    check('stockminimo', 'El campo es obligatorio!').not().isEmpty(),
    check('stockminimo', 'El  campo es obligatorio!').isNumeric(),
    validarCampos
],httpProducto.postInsertar) //insertar

router.put("/modificar/:id",[
    validarJWT,
    check('producto', 'El producto es obligatorio!').isMongoId(),
    check('producto').custom (productoHelper.existeProductoID),
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('nombre').custom (productoHelper.existeNombre),
    check('precio', 'El documento es obligatorio!').not().isEmpty().isNumeric(),
    check('cantidad', 'El documento es obligatorio!').not().isEmpty().isNumeric(),
    check('stockminimo', 'El campo es obligatorio!').not().isEmpty(),
    check('stockminimo', 'El campo es numérico!').isNumeric(),
], httpProducto.putModificar)//modificar

router.put("/activarproduc/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productoHelper.existeProductoID),
],httpProducto.putActivar) //activar

router.put("/desactivarproduc/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productoHelper.existeProductoID),
],httpProducto.putDesactivar)//desactivar

module.exports=router;