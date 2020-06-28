/**
 * index.js
 *
 * Created on 6 de Marzo de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

 // Componentes
import * as fs from "fs";
import * as express from "express";
import * as path from "path";

// Constantes
const _BASEDIR_ = path.join(path.dirname(__filename), '..');

/**
 * Modulo para cargar rutas
 *
 * @param req           request
 * @param res           response
 *
 * @return Promise<void>
 */
export default function (app: express.Express) {
  try {

    //Define las rutas de la API
    fs.readdirSync(path.join(_BASEDIR_,"routes")).forEach(async function(name) {
      
      const route = name.trim();
      
      //Obtenemos solos los scripts con extension js, evitamos los .map y obviamos el script principal.
      if(route.includes(".js") && !route.includes(".map") &&  !route.includes("index.js")){

        //Obtenemos el endpoint
        const endpoint = route.replace(".js","");

        //Importamos la ruta
        const importRoute = await import(`./${endpoint}`);
        app.use(importRoute.default);

      }
 
    });
    
  } catch (error) {
    console.error(`routes.js: (${error.stack})`);
  }
}