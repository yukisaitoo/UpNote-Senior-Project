module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    test: /\\.(png|jp(e*)g|svg|gif)$/,
    use: ["file-loader"],
  },
};
