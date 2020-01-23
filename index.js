const { declare } = require("@babel/helper-plugin-utils");
const { types: t } = require("@babel/core");

const allNodeTypes = Object.keys(t).filter(
  (key) =>
    key[0].match(/[A-Z]/) && !key.match(/_/) && !(key.toUpperCase() === key)
);

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    name: "remove-prev-node",

    visitor: {
      [allNodeTypes.join("|")](path) {
        const { node } = path;

        if (
          node.trailingComments &&
          node.trailingComments.some((comment) =>
            comment.value.match(/@babel-remove-prev-node/)
          )
        ) {
          path.get("trailingComments").forEach((p) => p.remove());
          path.remove();
        }
      },
    },
  };
});
