const fs = require("fs");
const babel = require("@babel/core");
const shelljs = require("shelljs");

test("works", () => {
  if (!fs.existsSync("./node_modules/babel-plugin-remove-prev-node")) {
    shelljs.ln("-s", "..", "./node_modules/babel-plugin-remove-prev-node");
  }

  const result = babel.transformSync(
    `
		import SomeValue, {SomeOtherValue, SomeType /* @babel-remove-prev-node */, SomeOtherType /* @babel-remove-prev-node */} from "somewhere";
	`,
    { plugins: ["babel-plugin-remove-prev-node"] }
  );

  expect(result.code).toMatchInlineSnapshot(
    `"import SomeValue, { SomeOtherValue } from \\"somewhere\\";"`
  );
});
