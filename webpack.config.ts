import * as path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { DefinePlugin, Configuration } from "webpack";
import merge from "webpack-merge";

const development: Configuration = {
  devtool: "inline-source-map",
  mode: "development",
};

const production: Configuration = {
  bail: true,
  devtool: undefined,
  externals: {
    react: "react",
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            comparisons: false,
            inline: 2,
            warnings: false,
          },
          // eslint-disable-next-line @typescript-eslint/camelcase
          keep_classnames: false,
          // eslint-disable-next-line @typescript-eslint/camelcase
          keep_fnames: false,
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            // eslint-disable-next-line @typescript-eslint/camelcase
            ascii_only: true,
          },
          parse: {
            ecma: 8,
          },
        },
      }),
    ],
  },
  output: {
    libraryTarget: "commonjs",
  },
};

export default merge(
  {
    entry: path.resolve(__dirname, "src/index.ts"),
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "index.js",
    },
    plugins: [
      new DefinePlugin({
        "process.env": JSON.stringify({
          NODE_ENV: process.env.NODE_ENV || "development",
        }),
      }),
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
      modules: ["node_modules"],
    },
  },
  process.env.NODE_ENV === "production" ? production : development
);
