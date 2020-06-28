"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * httpRequestError.ts
 *
 * Created on 2 de Noviembre de 2019
 * Copyright (c) 2019
 * Author Cristian Coronel <b>cristiang@fktech.net</b>
 *
 */
class httpRequestError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}
exports.default = httpRequestError;
//# sourceMappingURL=httpRequestError.js.map