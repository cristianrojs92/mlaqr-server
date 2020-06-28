"use strict";
/**
 * index.js
 *
 * Created on 6 de Marzo de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Componentes
const fs = require("fs");
const path = require("path");
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
function default_1(app) {
    try {
        //Define las rutas de la API
        fs.readdirSync(path.join(_BASEDIR_, "routes")).forEach(async function (name) {
            const route = name.trim();
            //Obtenemos solos los scripts con extension js, evitamos los .map y obviamos el script principal.
            if (route.includes(".js") && !route.includes(".map") && !route.includes("index.js")) {
                //Obtenemos el endpoint
                const endpoint = route.replace(".js", "");
                //Importamos la ruta
                const importRoute = await Promise.resolve().then(() => require(`./${endpoint}`));
                app.use(importRoute.default);
            }
        });
    }
    catch (error) {
        console.error(`routes.js: (${error.stack})`);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map