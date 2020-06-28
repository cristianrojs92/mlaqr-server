/*
* stores.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

import { Request, Response } from "express";
import * as service from "../services/stores";

// Utilidades
import httpRequestError from "../utils/httpRequestError";
import responseHandler from "../utils/responseHandler";

// Constantes globales
const { BAD_REQUEST, NOT_FOUND } = responseHandler.statusCodes;

/**
 * Agrega una nueva sucursal a mercado pago
 *
 * @param req               request
 * @param res               response
 *
 * @return Promise<void>
 */
export async function add(req: Request, res: Response): Promise<void> {

  try {

    let body;

    //Verificamos si recibimos el json
    if(req.body.json !== undefined){
      if( typeof req.body.json == "string"){
        body = JSON.parse(req.body.json)
      } else {
        body = req.body.json;
      }
      
    } else {
      throw new httpRequestError(BAD_REQUEST, `(add): No se recibieron datos`);
    }

    // Creamos una sucursal
    const results = await service.add(body);

    // Verifico el resultado
    if (results === undefined) {

      // Lanzamos error
      throw new httpRequestError(NOT_FOUND, "(add): Error al crear una sucursal");
    }


    // Respondemos a la solicitud con status = 200
    responseHandler.ok(res, results);

  } catch (error) {

    console.error(`(add): Se produjo un error al realizar la operación (${error.stack})`);

    // Verificamos el tipo de excepción
    if (error instanceof httpRequestError) {

      // Respondemos con error
      responseHandler.customCode(res, error.message, error.status);

    } else {

      // Respondemos con error
      responseHandler.internalError(res, "(add): Se produjo un error al realizar la operación");
    }
  }
}