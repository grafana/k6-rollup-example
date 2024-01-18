export const WorkloadConfig = {
  average: [
    { duration: '1m', target: 100 },
    { duration: '4m', target: 100 },
    { duration: '1m', target: 0 },
  ],
  stress: [
    { duration: '1m', target: 700 },
    { duration: '4m', target: 700 },
    { duration: '1m', target: 0 },
  ],
  smoke: [{ duration: '10s', target: 1 }],
};