import assert from "assert";

import {
  now,
  sample,
  timeFn,
  average,
  minimum,
  maximum,
  uniqueId
} from "./util.js";

const SUITE_MAX_RUNTIME = 3e3;

const SUITE = "suite";
const BENCH = "bench";
const CURRENT_SUITE_NAME = "currentSuiteName";
const CURRENT_SUITE_ID = "currentSuiteId";

const withSuiteNameGlobal = ({ suiteName, suiteId }, fn) => {
  global[CURRENT_SUITE_NAME] = suiteName;
  global[CURRENT_SUITE_ID] = suiteId;
  fn();
  delete global[CURRENT_SUITE_NAME];
  delete global[CURRENT_SUITE_ID];
};

const SUITES = {};
const BENCHES = {};

const suite = (suiteName, suiteFn) => {
  const suiteId = uniqueId("suite");
  SUITES[suiteId] = { suiteName, benches: [] };
  withSuiteNameGlobal({ suiteName, suiteId }, suiteFn);
};

const bench = (benchName, benchFn) => {
  const currentSuiteName = global[CURRENT_SUITE_NAME];
  const currentSuiteId = global[CURRENT_SUITE_ID];
  assert(
    typeof currentSuiteId === "undefined" || SUITES[currentSuiteId],
    "Either there is no current suite associated with bench id, or the bench is ready to be assigned to the suite."
  );
  const id = uniqueId("bench");
  const bench = (BENCHES[id] = { benchFn, benchName });
  const associatedSuite = SUITES[currentSuiteId];
  if (associatedSuite) {
    associatedSuite.benches[id] = bench;
  }
};

const runFnWithGlobals = async fn => {
  global[SUITE] = suite;
  global[BENCH] = bench;
  await fn();
  delete global[SUITE];
  delete global[BENCH];
};

const setupTests = filenames =>
  runFnWithGlobals(() => Promise.all(filenames.map(name => import(name)))).then(
    () => {
      assert(
        Object.values(BENCHES).length,
        "It seems like there are no `bench`s"
      );
    }
  );

const runTests = async () => {
  const benches = Object.values(BENCHES);
  benches.forEach(bench => {
    bench.times = [];
  });
  const start = now();
  do {
    const { times, benchFn } = sample(benches);
    times.push(timeFn(benchFn));
  } while (now() - start < SUITE_MAX_RUNTIME);
};

const benchEntriesOutput = benches => {
  let output = "";
  benches.forEach(([id, bench]) => {
    const min = minimum(bench.times);
    const max = maximum(bench.times);
    output += [bench.benchName, `(${bench.times.length} runs)`].join(" ");
    output += "\n";
    output += ["  average", average(bench.times).toPrecision(3)].join(" ");
    output += "\n";
    output += ["  best", min.toPrecision(3), "worst", max.toPrecision(3)].join(
      " "
    );
    output += "\n";
  });
  return output;
};

const logTestResults = () => {
  const suiteOutputs = Object.entries(SUITES).forEach(([id, suite]) => {
    const output = benchEntriesOutput(Object.entries(suite.benches));
    console.log(suite.suiteName);
    console.log(
      output
        .split("\n")
        .map(output => "  " + output)
        .join("\n")
    );
  });
  const output = benchEntriesOutput(
    Object.entries(BENCHES).filter(
      ([benchId, bench]) =>
        !Object.values(SUITES).some(suite => benchId in suite.benches)
    )
  );
  console.log(output);
};

export const run = filenames =>
  setupTests(filenames)
    .then(runTests)
    .then(logTestResults);
