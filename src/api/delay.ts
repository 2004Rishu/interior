export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const simulateError = (probability = 0.05) => {
  if (Math.random() < probability) {
    throw new Error('Simulated network error. Please try again.');
  }
};
