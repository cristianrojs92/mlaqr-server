"use strict";
/*
* notifications.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const config_1 = require("../config");
const api = require("./api");
/**
* Crea un nueva sucursal
*
* @param external_id          external_id
*
* @param name                 nombre de la sucursal
*
* @param location              localizacion
*
* @return              true/false o undefined
*
*/
async function get(hostname, api_path) {
    let data;
    try {
        //Creamos la url
        const hostname = `api.mercadopago.com`;
        const api_token = api_path.concat(`?access_token=${config_1.ACCESS_TOKEN}`);
        const response = await api.get(hostname, 443, api_token, "", null);
        //Verificamos si tenemos respuesta
        if (response !== undefined && response.data !== undefined) {
            console.log(`(get): respuesta: ` + response.data);
            data = response.data;
        }
    }
    catch (error) {
        if (error.response !== undefined && error.response.data !== undefined) {
            console.error(`(get): ${error.response.data.message}`);
        }
        else {
            console.error(`(get): Se produjo un error al realizar la operación (${error.stack})`);
        }
    }
    return data;
}
exports.get = get;
//# sourceMappingURL=notifications.js.map