import http from 'k6/http';
import { WorkloadConfig, sayHello } from 'https://github.com/grafana/k6-rollup-example/releases/download/v0.0.2/index.js';

export const options = {
  stages: WorkloadConfig.smoke
};

export default function () {

  console.log(sayHello());
  http.get('https://pizza.grafana.fun/');
}
