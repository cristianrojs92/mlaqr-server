/*
 * responseHandler.ts
 *
 * Created on 3 de octubre de 2019
 * Copyright (c) 2018
 * Author Cristian Coronel <b>cristiang@fktech.net</b>
 *
 */
import { Response } from "express";

function responseHandler() {

    // Codigos de retorno de Http
    const statusCodes = {
        OK: 200,
        BAD_REQUEST: 400,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500
    };

    /**
     *  Respuesta de solicitud correcta.
     *
     * @param res   response
     * @param data  datos de retorno
     *
     * @return { Object }
     */
    function ok(res: Response, data: any): void {

        // Codigo de respuesta.
        const code = 200;

        // Enviamos la respuesta.
        res.status(code).json(data);
    }

    /**
     * Respuesta de solicitud invalida.
     *
     * @param res       response
     * @param message   mensaje
     *
     * @return { Object }
     */
    function badRequest(res: Response, textMessage: string = "Parámetros invalidos.") {

        // Mensaje de respuesta
        const message = `${textMessage}`;

        // Codigo de respuesta.
        const code = 400;

        console.error(message);

        // Enviamos la respuesta.
        res.status(code).json({ code, message });
    }

    /**
     *  Respuesta de solicitud invalida.
     *
     * @param res       response
     * @param message   mensaje
     *
     * @return { Object }
     */
    function forbidden(res: Response, textMessage = "No posee permisos.") {

        // Mensaje de respuesta
        const message = `${textMessage}`;

        // Codigo de respuesta.
        const code = 403;

        console.error(message);

        // Enviamos la respuesta.
        res.status(code).json({ code, message });
    }

    /**
     *  Respuesta de solicitud invalida.
     *
     * @param res       response
     * @param message   mensaje
     *
     * @return { Object }
     */
    function notFound(res: Response, data: any): void {

        // Mensaje de respuesta
        const message = `${data.message}`;

        // Codigo de respuesta.
        const code = 404;

        console.error(message);

        // Enviamos la respuesta.
        res.status(code).json({ code, message });
    }

    /**
     *  Recurso no encontrado.
     *
     * @param res       response
     * @param message   mensaje
     *
     * @return { Object }
     */
    function internalError(res: Response, textMessage: string) {

        // Mensaje de respuesta
        const message = `${textMessage}`;

        // Codigo de respuesta.
        const code = 500;

        console.error(message);

        // Enviamos la respuesta.
        res.status(code).json({ code, message });
    }

    /**
     *  Respuesta personalizada.
     *
     * @param res       response
     * @param message   mensaje
     * @param code      { http code }
     *
     * @return { Object }
     */
    function customCode(res: Response, textMessage: string, code: number = 200) {

        // Mensaje de respuesta
        const message = `${textMessage}`;

        console.error(message);

        // Enviamos la respuesta.
        res.status(code).json({ code, message });
    }

    return ({

        ok,
        badRequest,
        forbidden,
        notFound,
        internalError,
        customCode,
        statusCodes

    });
}

export default responseHandler();