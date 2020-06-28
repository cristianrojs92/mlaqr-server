/*
* httpResponses.d.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

declare namespace mlaqr.http {

  export const enum status {
    OK = 200,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
  }

  export interface response {
    ret: boolean;
    code?: status,
    data?: any;
    errorMsg?: string;
  }

  export interface errorForm {
    haveError: boolean;
    fields: string[];
    message?: string;
  } 

  
}