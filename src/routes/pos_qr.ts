/*
* pos_qr.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

import { Router } from "express";
import * as controller from "../controllers/pos_qr";

const api: Router = Router();

// Rutas de acceso
api.post("/api/posqr",            controller.add);
api.get("/api/posqr",            controller.get);

export default api;