import { inspect } from "util";
import ts from "typescript";

export const createTsAst = () => {
  const tspestcode = ts.createProgram(["../lib/framework.js"], {
    allowJs: true
  });
  const sourceFile = tspestcode.getSourceFile("../lib/framework.js");
  return sourceFile;
};

// const toKind = node => ts.SyntaxKind[node.kind];

// const intoCollectedForEachChild = (node, collected) => {
//   const newNode = { kind: toKind(node), children: [] };
//   collected.push(newNode);
//   ts.forEachChild(node, child =>
//     intoCollectedForEachChild(child, newNode.children)
//   );
// };

// const collected = [];
// ts.forEachChild(sourceFile, node => intoCollectedForEachChild(node, collected));

// console.log(inspect(collected, { depth: null, colors: true }));
