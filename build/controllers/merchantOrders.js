"use strict";
/*
* merchantOrders.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const service = require("../services/merchantOrders");
// Utilidades
const httpRequestError_1 = require("../utils/httpRequestError");
const responseHandler_1 = require("../utils/responseHandler");
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
        let query;
        //Verificamos si recibimos el json
        if (req.query !== undefined) {
            if (typeof req.query == "string") {
                query = JSON.parse(req.query);
            }
            else {
                query = req.query;
            }
        }
        else {
            throw new httpRequestError_1.default(BAD_REQUEST, `(get): No se recibieron datos`);
        }
        //Buscamos el estado de la orden
        const results = await service.get(query.external_reference);
        // Verifico el resultado
        if (results === undefined) {
            // Lanzamos error
            throw new httpRequestError_1.default(NOT_FOUND, "(get): Error al crear una sucursal");
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
//# sourceMappingURL=merchantOrders.js.map