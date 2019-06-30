export const intersection = (...arrays) =>
  arrays.reduce((a, b) => a.filter(c => b.includes(c)));
