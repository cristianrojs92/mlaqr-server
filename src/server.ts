/*
 * server.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

//Componentes
import * as express from "express";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import { headers } from "./middlewares/headers";
import  routes from "./routes";

//Constantes de configuracion
import * as config from "./config";

/**
 * Inicializa el servidor
 *
 */
async function start() {

  console.log(`server.js: Iniciando servidor`);

  //Intanciamos la aplicacion de express
  const app : express.Express = express();

  //Middleware de seguridad: protege los headers http del servidor.
  app.use(helmet());

  //Se parsea el body a json
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //Se agregan cabeceras.
  app.use(headers);

  //Se agregan las rutas.
  routes(app);

  //Inicia el servidor.
  app.listen(config.APP_PORT, () => {
    console.log(`server.js: El servidor esta corriendo en http://localhost:${config.APP_PORT}`);
  })

}

// Ejecuta la inicializacion
start();






