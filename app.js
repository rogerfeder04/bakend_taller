
const express= require("express")
const cors=require ('cors')
const mongoose = require('mongoose');
require('dotenv').config()
//aca enrutamos a la carpeta corespondiente routes
// const usuariosRouter = require('./src/routes/usuarios');
const usuarios= require ('./src/routes/usuarios');
const producto= require ('./src/routes/producto');
const venta= require ('./src/routes/ventas');
const detalleventa= require ('./src/routes/detallesventa');
const carrito= require ('./src/routes/carrito');
const clientes= require ('./src/routes/clientes');



const app = express()
app.use(cors());
app.use(express.json());



// app.use('/api/usuarios', usuariosRouter);

app.use('/api/usuarios', usuarios);
app.use('/api/productos', producto);
app.use('/api/venta', venta);
app.use('/api/detalleventa', detalleventa);
app.use('/api/carrito', carrito);
app.use('/api/clientes', clientes);

const PORT = process.env.PORT || 4003; 

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT} bueno`);
    mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Conectado'));
});



// const app= express()

// app.use(cors())
// app.use(express.json())
// app.use('usuarios/api',usuarios)

// app.listen()