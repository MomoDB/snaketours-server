import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

const myErrorCounter = new Counter('error_counter');

export const options = {
  vus: 200,
  duration: '30s',
};

export default function () {
  const randomId = Math.floor(Math.random() * (Math.floor(10000000) - Math.ceil(9000000) + 1)) + 9000000;
  const res = http.get(`http://localhost:3000/tour/${randomId}`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  if (res.status === 500) {
    myErrorCounter.add(1);
  }
  sleep(1);
}
