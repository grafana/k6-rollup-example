import http from 'k6/http';
import { WorkloadConfig, sayHello } from 'test-commons';

export const options = {
  stages: WorkloadConfig.smoke
};

export default function () {

  console.log(sayHello());
  http.get('https://pizza.grafana.fun/');
}
