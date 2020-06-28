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
const service = require("../services/notifications");
// Utilidades
const httpRequestError_1 = require("../utils/httpRequestError");
const responseHandler_1 = require("../utils/responseHandler");
const path = require("path");
const fs = require("fs");
const url = require("url");
// Directorio base
const _BASEDIR_ = path.join(path.dirname(__filename), '.');
// Constantes globales
const { BAD_REQUEST, NOT_FOUND } = responseHandler_1.default.statusCodes;
/**
 * Busca el estado de una orden
 *
 * @param req               request
 * @param res               response
 *
 * @return Promise<void>
 */
async function get(req, res) {
    try {
        let results;
        //Verificamos si hubo alguna actualizacion
        const data = getNotificationMechantOrder();
        if (data !== undefined && data.resource) {
            //Parseamos la url
            const urlMechantOrde = url.parse(data.resource);
            //Ejecutamos la consuta de estado
            results = await service.get(urlMechantOrde.host, urlMechantOrde.path);
            //Eliminamos la notificacion
            deleteNotificationMechantOrder();
        }
        // Verifico el resultado
        if (results === undefined) {
            // Respondemos con error
            responseHandler_1.default.internalError(res, "(get): No hay resultados");
        }
        // Respondemos a la solicitud con status = 200
        responseHandler_1.default.ok(res, results);
    }
    catch (error) {
        console.error(`(get): Se produjo un error al realizar la operación (${error.stack})`);
        // Verificamos el tipo de excepción
        if (error instanceof httpRequestError_1.default) {
            // Respondemos con error
            responseHandler_1.default.customCode(res, error.message, error.status);
        }
        else {
            // Respondemos con error
            responseHandler_1.default.internalError(res, "(get): Se produjo un error al realizar la operación");
        }
    }
}
exports.get = get;
function getNotificationMechantOrder() {
    let data = undefined;
    try {
        //Verificamos si el archivo existe
        if (fs.existsSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json'))) {
            // Obtiene el template para el mensaje
            data = JSON.parse((fs.readFileSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json')).toString()));
        }
    }
    catch (error) {
        console.error(`(getNotificationMechantOrder): Se produjo un error al realizar la operación (${error.stack})`);
    }
    return data;
}
function deleteNotificationMechantOrder() {
    try {
        //Verificamos si el archivo existe
        if (fs.existsSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json'))) {
            //Eliminamos el archivo
            fs.unlinkSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json'));
        }
    }
    catch (error) {
        console.error(`(deleteNotificationMechantOrder): Se produjo un error al realizar la operación (${error.stack})`);
    }
}
//# sourceMappingURL=notifications.js.map