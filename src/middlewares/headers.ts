/*
* headers.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

import { NextFunction, Request, Response } from "express";

/**
 * Función de middleware para la incorporación de cabeceras
 *
 * @param req   Request
 * @param res   Response
 * @param next  NextFunction
 */
export async function headers(req: Request, res: Response, next: NextFunction): Promise<void> {

  // Insertamos las cabeceras necesarias
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  // Continuamos con la ejecución
  next();

  return;
}
