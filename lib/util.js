export const now = () => {
  const t = process.hrtime();
  return t[0] * 1e3 + t[1] / 1e6;
};

export const sample = xs => xs[Math.floor(Math.random() * xs.length)];

export const timeFn = fn => {
  const start = now();
  fn();
  return now() - start;
};

export const average = xs => xs.reduce((sum, x) => sum + x, 0) / xs.length;

export const minimum = xs => {
  let m = Infinity;
  xs.forEach(x => {
    if (x < m) m = x;
  });
  return m;
};

export const maximum = xs => {
  let m = -Infinity;
  xs.forEach(x => {
    if (x > m) m = x;
  });
  return m;
};

const first = xs => xs[0];

const bucket = (xs, tokey = x => x) => {
  const record = {};
  xs.forEach(x => (record[tokey(x)] || (record[tokey(x)] = [])).push(x));
  return record;
};

export const unique = (xs, tokey = x => x) =>
  Object.values(bucket(xs, tokey)).map(first);

let id = 0;
export const uniqueId = prefix => prefix + id++;
