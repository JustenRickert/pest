import { inspect } from "util";
import babel from "@babel/core";
import fs from "fs";

export const createBabelAst = () => {
  const pestcode = fs.readFileSync("../lib/framework.js", "utf-8");
  const ast = babel.parseSync(pestcode);
  return ast;
};

// const intoCollectionForEachChild = (node, collected) => {};

// const collected = [];
// ast.program.body.forEach(node => intoCollectionForEachChild(node, collected));

// console.log(inspect(ast.program.body, { depth: 2, colors: true }));
