import babel from "@babel/core";
import fs from "fs";

import { createBabelAst } from "./create-babel-ast.js";
import { createTsAst } from "./create-typescript-ast.js";

bench("babel", createBabelAst);

bench("typescript", createTsAst);
