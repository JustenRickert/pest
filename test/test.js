const allThree = () => {
  3 * 9;
  1 + 1;
  Math.atan2(Math.PI ** 2);
};

const range = n =>
  Array(n)
    .fill()
    .map((_, i) => i);

const average = xs => xs.reduce((sum, x) => sum + x, 0) / xs.length;

suite("suite", () => {
  bench("multiplication", () => {
    3 * 9;
  });

  bench("addition", () => {
    1 + 1;
  });

  bench("atan2", () => {
    Math.atan2(Math.PI ** 2);
  });

  bench("all three", allThree);

  bench("linear", average(range()));
});

bench("addition", () => {
  1 + 1;
});

bench("atan2", () => {
  Math.atan2(Math.PI ** 2);
});
