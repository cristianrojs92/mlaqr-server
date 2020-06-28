/*
* orders.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

import * as api from "./api";

import { COLLECTOR_ID, ACCESS_TOKEN } from "../config"

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

export async function add(external_pos_id: string, body: any): Promise<object> {

  let data;

  try {


    //Creamos la url
    const hostname = `api.mercadopago.com`;
    const api_path = `/mpmobile/instore/qr/${COLLECTOR_ID}/${external_pos_id}?access_token=${ACCESS_TOKEN}`;

    

    const response = await api.post(hostname, 443, api_path, "", "", body,null);

    //Verificamos si tenemos respuesta
    if(response !== undefined && response.data !== undefined) {
      console.log(`(add): respuesta: ` + response.data);
      data = response.data;
    }

  } catch (error) {

    
    if(error.response !== undefined && error.response.data !== undefined){
      console.error(`(add): ${error.response.data.message}`);
    } else {
      console.error(`(add): Se produjo un error al realizar la operación (${error.stack})`);
    }
  }
  return data;

}