"use strict";
/*
* mpHooks.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = require("../controllers/mpHooks");
const api = express_1.Router();
// Rutas de acceso
api.post("/api/mpHooks", controller.listen);
exports.default = api;
//# sourceMappingURL=mpHooks.js.map