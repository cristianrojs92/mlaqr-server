/*
* notifications.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

import { Router } from "express";
import * as controller from "../controllers/notifications";

const api: Router = Router();

// Rutas de acceso
api.get("/api/notifications",            controller.get);

export default api;