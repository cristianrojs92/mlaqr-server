"use strict";
/*
* stores.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.add = void 0;
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
        const api_path = `/pos?access_token=${config_1.ACCESS_TOKEN}`;
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
async function get(external_id) {
    let data;
    try {
        //Creamos la url
        const hostname = `api.mercadopago.com`;
        const api_path = `/pos?external_id=${external_id}&access_token=${config_1.ACCESS_TOKEN}`;
        const response = await api.get(hostname, 443, api_path, "", null);
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
//# sourceMappingURL=pos_qr.js.map