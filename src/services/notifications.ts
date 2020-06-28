/*
* notifications.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

import { COLLECTOR_ID, ACCESS_TOKEN } from "../config"
import * as api from "./api";


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

export async function get(hostname : string, api_path : string): Promise<object> {

  let data;

  try {

    //Creamos la url
    const hostname = `api.mercadopago.com`;
    
    const api_token = api_path.concat(`?access_token=${ACCESS_TOKEN}`);

    

    const response = await api.get(hostname, 443, api_token, "",null);

    //Verificamos si tenemos respuesta
    if(response !== undefined && response.data !== undefined) {
      console.log(`(get): respuesta: ` + response.data);
      data = response.data;
    }

  } catch (error) {

    
    if(error.response !== undefined && error.response.data !== undefined){
      console.error(`(get): ${error.response.data.message}`);
    } else {
      console.error(`(get): Se produjo un error al realizar la operación (${error.stack})`);
    }
  }
  return data;

}
