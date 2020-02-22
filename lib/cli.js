import path from "path";
import fs from "fs";

import { run } from "./framework.js";
import { unique } from "./util.js";

const cwd = process.cwd();
const inputs = process.argv.slice(2);

const filenames = inputs.reduce((filenames, input) => {
  const stat = fs.statSync(path.join(cwd, input));
  if (stat.isDirectory()) {
    const files = fs.readdirSync(input);
    return filenames.concat(
      files
        .filter(name => /.js$/.test(name))
        .map(name => path.resolve(input, name))
    );
  }
  if (/.js$/.test(input)) return filenames.concat(path.resolve(input));
  return filenames;
}, []);

run(unique(filenames));
