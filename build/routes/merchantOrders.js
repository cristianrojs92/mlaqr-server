"use strict";
/*
* merchantOrders.ts
 *
 * Created on 25 de Junio de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = require("../controllers/merchantOrders");
const api = express_1.Router();
// Rutas de acceso
api.get("/api/merchantOrders", controller.get);
exports.default = api;
//# sourceMappingURL=merchantOrders.js.map