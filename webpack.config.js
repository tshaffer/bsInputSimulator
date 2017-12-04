module.exports = {
  entry: './index.ts',
  output: {
    publicPath: 'simulator/',
    path: __dirname + '/dist',
    libraryTarget: 'umd',
    library: 'simulator',
    filename: 'simulator.js'
  },
  devtool: 'source-map',
  target: 'node',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ],
  }
}

