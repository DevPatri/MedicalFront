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

//* script para comprobar el status 200 ok.
// export const options = {
//   stages: [
//     { duration: '30s', target: 10 },
//     { duration: '1m10s', target: 100 },
//     { duration: '10s', target: 0 },
//   ],
// };

export default function () {
  const res = http.get('http://localhost:300');
  check(res, { 'status was 200': (r) => r.status == 200})
  sleep(10);
}

