/*
* notifications.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

import { Request, Response } from "express";
import * as service from "../services/notifications";

// Utilidades
import httpRequestError from "../utils/httpRequestError";
import responseHandler from "../utils/responseHandler";

import * as path from "path";
import * as fs from "fs";
import * as url from "url";

// Directorio base
const _BASEDIR_ = path.join(path.dirname(__filename), '.');

// Constantes globales
const { BAD_REQUEST, NOT_FOUND } = responseHandler.statusCodes;

/**
 * Busca el estado de una orden
 *
 * @param req               request
 * @param res               response
 *
 * @return Promise<void>
 */
export async function get(req: Request, res: Response): Promise<void> {

  try {

      let results;

      //Verificamos si hubo alguna actualizacion
      const data = getNotificationMechantOrder();

      if(data !== undefined && data.resource){
        
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
        responseHandler.internalError(res, "(get): No hay resultados");
      }


      // Respondemos a la solicitud con status = 200
      responseHandler.ok(res, results);
    


  } catch (error) {

    console.error(`(get): Se produjo un error al realizar la operación (${error.stack})`);

    // Verificamos el tipo de excepción
    if (error instanceof httpRequestError) {

      // Respondemos con error
      responseHandler.customCode(res, error.message, error.status);

    } else {

      // Respondemos con error
      responseHandler.internalError(res, "(get): Se produjo un error al realizar la operación");
    }
  }

}


function getNotificationMechantOrder() : any | undefined {

  let data = undefined;

  try {

    //Verificamos si el archivo existe
    if(fs.existsSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json'))) {
    // Obtiene el template para el mensaje
      data = JSON.parse((fs.readFileSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json')).toString()));
   }

  } catch (error) {
    console.error(`(getNotificationMechantOrder): Se produjo un error al realizar la operación (${error.stack})`);
  }

  return data;
}


function deleteNotificationMechantOrder(){

  try {
    
    //Verificamos si el archivo existe
    if(fs.existsSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json'))) {
      
      //Eliminamos el archivo
      fs.unlinkSync(path.join(_BASEDIR_, '../tmp/notificationMerchanOrder.json'));
    }
    

  } catch (error) {
    console.error(`(deleteNotificationMechantOrder): Se produjo un error al realizar la operación (${error.stack})`);
  }

}

