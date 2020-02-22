const range = n =>
  Array(n)
    .fill()
    .map((_, i) => i);

const NS = range(1e4).map(i => i + 1);

const add_while = () => {
  let sum = 0;
  let i = -1;
  while (++i <= NS.length) sum += NS[i];
  return sum;
};

const add_for = () => {
  let sum = 0;
  for (let n of NS) sum += n;
  return sum;
};

const add_reduce = () => NS.reduce((sum, n) => sum + n, 0);

bench("while", add_while);

bench("for", add_for);

bench("reduce", add_reduce);
