"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
/*
* stores.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
const api = require("./api");
const config_1 = require("../config");
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
async function add(body) {
    let data;
    try {
        //Creamos la url
        const hostname = `api.mercadopago.com`;
        const api_path = `/users/${config_1.COLLECTOR_ID}/stores?access_token=${config_1.ACCESS_TOKEN}`;
        const response = await api.post(hostname, 443, api_path, "", "", body, null);
        //Verificamos si tenemos respuesta
        if (response !== undefined && response.data !== undefined) {
            console.log(`(add): respuesta: ` + response.data);
            data = response.data;
        }
    }
    catch (error) {
        if (error.response !== undefined && error.response.data !== undefined) {
            console.error(`(add): ${error.response.data.message}`);
        }
        else {
            console.error(`(add): Se produjo un error al realizar la operación (${error.stack})`);
        }
    }
    return data;
}
exports.add = add;
//# sourceMappingURL=stores.js.map