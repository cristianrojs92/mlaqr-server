/*
 * httpRequestError.ts
 *
 * Created on 2 de Noviembre de 2019
 * Copyright (c) 2019
 * Author Cristian Coronel <b>cristiang@fktech.net</b>
 *
 */
export default class httpRequestError extends Error {

    constructor(public status: number, public message: string) {
        super();
    }
}
