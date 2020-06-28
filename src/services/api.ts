/*
 * api.ts
 *
 * Created on 14 de abril de 2020
 * Copyright (c) 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

 //Modulos
 import * as https from "https";
 import * as http from "http";
 import * as stream_module from "stream";

const stream = stream_module.Transform;


/**
 * Verifica si se trata de un json
 *
 * @param something         string a verificar
 * 
 * @return                  true o false
 * 
 */
function isJson(something : string) {

  try {

    something = JSON.stringify(something);
    JSON.parse(something);

  } catch (e) {
    return false;
  }
  
  return true;

}


/**
 * Envia un request a una API por GET
 *
 * @param hostname          url o ip
 * @param port              puerto
 * @param api               api a consultar
 * @param token             JWT token o undefined para metodos anonimos
 * @param dpf               funcion para proteccion de datos
 *
 */
export function get(hostname : string, port : number, api : string, token ? : string, dpf ? : Function) : Promise<mlaqr.http.response> {

  return new Promise (( resolve , reject ) => {

    try {

      //define las opciones del request
      let options : https.RequestOptions = {

        hostname: hostname,
        port: port,
        path: api,
        method: "GET"
  
      }; 
  
      //Si se define un token
      if(token){
        options.headers = {
          "Authorization": `${token}`
        };
      }
  
      //Ejecuta el request
      let req = https.request(options, (res : http.IncomingMessage) => {
  
        let body : string = "";
  
        try{
  
          // Define el encoding
          res.setEncoding("utf8");
  
        } catch(error) {
          console.error(`api.ts (get [request]): error (${error.stack})`);
          reject(Error(error.message));
        }
  
        // Recibe la informacion en la respuesta
        res.on("data", function(chunk) {
  
          try {
  
            // Realiza un append del mensaje
            body += chunk;
  
          } catch(error) {
            console.error(`api.ts(get [on.data]): error (${error.stack})`);
            reject(Error(error.message));
          }
  
        });

        // Finaliza la recepcion de la respuesta
        res.on("end", function() {

          try {

            // Si la respuesta fue correcta (HTTP OK)
            if (res.statusCode === 200) {

              const response : mlaqr.http.response = {
                ret : true,
                code : mlaqr.http.status.OK,
                data : JSON.parse(body)
              };  
              resolve(response);            
            } 

            // Para otros resultados
            else {

              // Conforma el mensaje de error
              resolve( {
                ret : false,
                errorMsg : res.statusMessage
              });

            }

          } catch(err) {
            console.error(`api.js (get [on.end]): error (${err.stack})`);
            reject(Error(err.message));
          }

        });
      });

      // Si ocurre un error en el request
      req.on("error", function(err : Error) {

        console.error(`api.js (get): ERROR (message: ${err.message})`);
        resolve( {
          ret : false,
          errorMsg : err.message
        });

      });

      // Finaliza y ejecuta el request
      req.end();
  
    } catch(error) {
      console.error(`api.ts (get): error (${error.stack})`);
    }

  });

}

/**
 * Envia un request a una API por DELETE
 *
 * @param hostname          url o ip
 * @param port              puerto
 * @param api               api a consultar
 * @param token             JWT token o undefined para metodos anonimos
 * @param dpf               funcion para proteccion de datos
 *
 */
export function del(hostname : string, port : number, api : string, token : string, dpf : Function) {

  // Retorna un Promise
  return new Promise(function(resolve, reject) {

    try {

      // Define las opciones para el request
      let options : http.RequestOptions = {
        
        hostname: hostname,
        port: port,
        path: api,
        method: "DELETE",

        /* @DEBUG
        hostname: "httpstat.us",
        port: 80,
        path: "/200",
        method: "DELETE"
        */

      };

      // Si se define un token
      if (token !== undefined) {

        options.headers = {
          "Authorization": `${token}`
        }

      }

      // Ejecuta el request
      let req = https.request(options, function(res) {

        let body : string = "";

        try {

          // Define el encoding
          res.setEncoding("utf8");

        } catch(err) {
          console.error(`api.js (delete [request]): error (${err.stack})`);
          reject(Error(err.message));
        }

        // Recibe la informacion en la respuesta
        res.on("data", function(chunk) {

          try {

            // Realiza un append del mensaje
            body += chunk;

          } catch(err) {
            console.error(`api.js (delete [on.data]): error (${err.stack})`);
            reject(Error(err.message));
          }

        });

        // Finaliza la recepcion de la respuesta
        res.on("end", function() {

          try {
          

            // Si la respuesta fue correcta (HTTP OK o NO CONTENT)
            if (res.statusCode === 200 || res.statusCode === 204) {

              if (isJson(body)) {

                resolve({
                  code: res.statusCode,
                  data: JSON.parse(body)
                });

              } else {

                resolve({
                  code: res.statusCode,
                  data: {}
                });

              }
              
            } 
            // Para otros resultados
            else {

              // Conforma el mensaje de error
              resolve(Error(res.statusMessage));

            }

          } catch(err) {
            console.error(`api.js (delete [on.end]): error (${err.stack})`);
            reject(Error(err.message));
          }

        });

      });

      // Si ocurre un error en el request
      req.on("error", function(err) {

        console.error(`api.js (delete): ERROR ( message: ${err.message})`);
        resolve(Error(err.message));

      });

      // Finaliza y ejecuta el request
      req.end();


    } catch(err) {
      console.error(`api.js (delete): error (${err.stack})`);
      reject(Error(err.message));
    }

  });

}

/**
 * Envia un request a una API por POST
 *
 * @param hostname          url o ip
 * @param port              puerto
 * @param api               api a consultar
 * @param token             JWT token o undefined para metodos anonimos
 * @param type              content type de los datos enviados
 * @param data              datos a enviar en el post
 * @param dpf               funcion para proteccion de datos
 *
 */
export function post(hostname : string, port : number, api : string, token : string, type : string, data : object, dpf : Function)  : Promise<mlaqr.http.response> {
  
  // Retorna un Promise
  return new Promise(function(resolve, reject) {

    try {

      let body : string;

      // Define las opciones para el request
      let options : http.RequestOptions = {
        
        hostname: hostname,
        port: port,
        path: api,
        method: "POST",

        /* @DEBUG
        hostname: "httpstat.us",
        port: 80,
        path: "/200",
        method: "POST"
        */

        headers: {
          "Content-Type": type
        }

      };

      // Si se definen datos para ser enviados en el request
      if (data !== undefined) {

        body = JSON.stringify(data);

        // @TODO Comprime el contenido del mensaje

        // Define los headers del request
        options.headers["Content-Length"] = Buffer.byteLength(body);

      }

      // Si se define un token
      if (token) {
        options.headers["Authorization"] = `${token}`;
      }

      // Ejecuta el request
      let req = https.request(options, (res : http.IncomingMessage) => {

        body = "";

        try {

          // Define el encoding
          res.setEncoding("utf8");

        } catch(err) {
          console.error(`api.js (post [request]): error (${err.stack})`);
          reject(Error(err.message));
        }

        // Recibe la informacion en la respuesta
        res.on("data", function(chunk) {

          try {

            // Realiza un append del mensaje
            body += chunk;

          } catch(err) {
            console.error(`api.js (post [on.data]): error (${err.stack})`);
            reject(Error(err.message));
          }

        });

        // Finaliza la recepcion de la respuesta
        res.on("end", function() {

          try {

            // Si la respuesta fue correcta (HTTP OK o CREATED)
            if (res.statusCode === 200 || res.statusCode === 201) {

              resolve({
                ret : true,
                code: res.statusCode,
                data: JSON.parse(body)
              });
              
            } 
            // Para otros resultados
            else {

              // Conforma el mensaje de error
              resolve( {
                ret : false,
                errorMsg : res.statusMessage
              });
            }

          } catch(err) {
            console.error(`api.js (post [on.end]): error (${err.stack})`);
            reject(Error(err.message));
          }

        });

      });

      // Si ocurre un error en el request
      req.on("error", function(err : Error) {

        console.error(`api.js (post): ERROR ( message: ${err.message})`);
        resolve( {
          ret : false,
          errorMsg : err.message
        });
      });

      // Escribe el body del request
      if (body !== undefined) {
        req.write(body);        
      }

      // Finaliza y ejecuta el request
      req.end();

    } catch(err) {
      console.error(`api.js (post): error (${err.stack})`);
      resolve( {
        ret : false,
        errorMsg : err.message
      });
    }

  });

}

/**
 * Envia un request de download por GET
 *
 * @param url               url que se debe descargar
 *
 */
export function download(url : string) {
  
  // Retorna un Promise
  return new Promise(function(resolve, reject) {

    try {

      // Ejecuta el request
      let req = https.request(url, function(res) {

        var data = new stream();

        // Recibe la informacion en la respuesta
        res.on("data", function(chunk) {

          try {
            data.push(chunk);
          } catch(err) {
            console.error(`api.js (download [on.data]): error (${err.stack})`);
            reject(Error(err.message));
          }

        });

        // Finaliza la recepcion de la respuesta
        res.on("end", function() {

          try {

            // Si la respuesta fue correcta (HTTP OK)
            if (res.statusCode === 200) {

              resolve({
                code: res.statusCode,
                data: data.read()
              });
              
            } 
            // Para otros resultados
            else {

              // Conforma el mensaje de error
              resolve(Error(res.statusMessage));

            }

          } catch(err) {
            console.error(`api.js (download [on.end]): error (${err.stack})`);
            reject(Error(err.message));
          }

        });

      });

      // Si ocurre un error en el request
      req.on("error", function(err) {

        console.error(`api.js (download): ERROR (message: ${err.message})`);
        resolve(err);
      });

      // Finaliza y ejecuta el request
      req.end();

    } catch(err) {
      console.error(`api.js (download): error (${err.stack})`);
      reject(Error(err.message));
    }

  });

}


class incomingMessage extends http.IncomingMessage{
  req ? : any;
  _headers ? : any;
  originalUrl ? : string;
  body? : string;
}

class clientRequest extends http.ClientRequest{
  req ? : any;
  _headers ? : any;
  originalUrl ? : string;
  body? : string;
}

class serverResponse extends http.ServerResponse{
  req ? : any;
  _headers ? : any;
  originalUrl ? : string;
  body? : string;
  _contentLength : number;
}



