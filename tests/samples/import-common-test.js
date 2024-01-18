import http from 'k6/http';
import { WorkloadConfig } from 'test-commons/config/workload.js';

export const options = {
  stages: WorkloadConfig.smoke
};

export default function () {
  http.get('https://pizza.grafana.fun/');
}
