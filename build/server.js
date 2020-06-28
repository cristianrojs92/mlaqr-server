"use strict";
/*
 * server.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
//Componentes
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const headers_1 = require("./middlewares/headers");
const routes_1 = require("./routes");
//Constantes de configuracion
const config = require("./config");
/**
 * Inicializa el servidor
 *
 */
async function start() {
    console.log(`server.js: Iniciando servidor`);
    //Intanciamos la aplicacion de express
    const app = express();
    //Middleware de seguridad: protege los headers http del servidor.
    app.use(helmet());
    //Se parsea el body a json
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    //Se agregan cabeceras.
    app.use(headers_1.headers);
    //Se agregan las rutas.
    routes_1.default(app);
    //Inicia el servidor.
    app.listen(config.APP_PORT, () => {
        console.log(`server.js: El servidor esta corriendo en http://localhost:${config.APP_PORT}`);
    });
}
// Ejecuta la inicializacion
start();
//# sourceMappingURL=server.js.map