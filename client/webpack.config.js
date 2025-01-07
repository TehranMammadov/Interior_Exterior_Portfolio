module.exports = {
  mode: "development", // or "production"
  resolve: {
    extensions: [".js", ".jsx", ".mjs"],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto", // Ensures Webpack treats `.mjs` files as ES modules
      },
    ],
  },
};
