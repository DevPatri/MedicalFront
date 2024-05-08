import  http  from 'k6/http';
import {check, sleep } from 'k6';

//* prueba básica
// export const options = {
//   vus: 10,
//   duration: '30s',
// };
// export default function () {
//   http.get('http://localhost:3000');
//   sleep(10);
// }

/* 
  * Opciones de carga de trabajo para simular 10 usuarios durante 30 segundos, 
  * luego 100 usuarios durante 50 segundos
  * y finalmente 0 usuarios durante 10 segundos.
*/
export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '50s', target: 100 },
    { duration: '10s', target: 0 },
  ],
};

//* script para comprobar el status 200 ok.
export default function () {

  var url = 'http://localhost:3000';
  var params = {
    auth: 'basic',
    usuario: 'PatriEgea',
    clave: '123456'
  }

  const res = http.get(url, params);
  check(res, { 'status was 200': (r) => r.status == 200})
  sleep(10);
}

