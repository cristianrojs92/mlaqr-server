"use strict";
/*
* mpHooks.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const path = require("path");
const fs = require("fs");
// Utilidades
const httpRequestError_1 = require("../utils/httpRequestError");
const responseHandler_1 = require("../utils/responseHandler");
/** Constantes globales **/
// Directorio base
const _BASEDIR_ = path.join(path.dirname(__filename), '.');
/**
 * Escucha un hook de mercado pago
 *
 * @param req               request
 * @param res               response
 *
 * @return Promise<void>
 */
async function listen(req, res) {
    try {
        let body;
        //Verificamos si recibimos el body
        if (req.body !== undefined) {
            if (typeof req.body === "string") {
                body = JSON.parse(req.body);
            }
            else {
                body = req.body;
            }
        }
        let query;
        //Verificamos si recibimos el parametros
        if (req.query !== undefined) {
            if (typeof req.query == "string") {
                query = JSON.parse(req.query);
            }
            else {
                query = req.query;
            }
        }
        console.log(`Recibimos una notificacion body= ${body} query=${query}`);
        //Estado merchant_orders
        /*
          Ejemplo del body
          {
            "resource": "https://api.mercadolibre.com/merchant_orders/1550326086",
            "topic": "merchant_order"
          }
    
          Ejemplo de parametros
          {
            id: 1550326086
            topic: merchant_order
          }
        */
        //Verificamos si la notificacion es de merchant_orders
        if (query.topic === "merchant_order") {
            //Almacenamos la notificaciones en un json
            if (body.resource !== undefined && body.topic !== undefined) {
                saveNotificationMechantOrder(body.resource, body.topic);
            }
        }
        // Respondemos a la solicitud con status = 200
        responseHandler_1.default.ok(res, {});
    }
    catch (error) {
        console.error(`(add): Se produjo un error al realizar la operación (${error.stack})`);
        // Verificamos el tipo de excepción
        if (error instanceof httpRequestError_1.default) {
            // Respondemos con error
            responseHandler_1.default.customCode(res, error.message, error.status);
        }
        else {
            // Respondemos con error
            responseHandler_1.default.internalError(res, "(add): Se produjo un error al realizar la operación");
        }
    }
}
exports.listen = listen;
function saveNotificationMechantOrder(resource, topic) {
    try {
        //Verificamos si el archivo existe
        if (fs.existsSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json'))) {
            //Eliminamos el archivo previo
            fs.unlinkSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json'));
        }
        // Obtiene el template para el mensaje
        fs.writeFileSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json'), JSON.stringify({ resource, topic }));
    }
    catch (error) {
        console.error(`(saveNotificationMechantOrder): Se produjo un error al realizar la operación (${error.stack})`);
    }
}
//# sourceMappingURL=mpHooks.js.map