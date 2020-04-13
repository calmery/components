import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import customConfig from "../webpack.config";

module.exports = {
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-knobs",
  ],
  stories: ["../src/**/*.stories.tsx"],
  webpackFinal: (config: webpack.Configuration) => {
    if (config.module) {
      config.module.rules = config.module.rules.map((rule) => {
        if (
          rule.test &&
          rule.test instanceof RegExp &&
          rule.test.test(".svg")
        ) {
          return {
            ...rule,
            exclude: /\.svg$/,
          };
        }

        return rule;
      });
    }

    return merge(customConfig, config, {
      module: {
        rules: [
          {
            test: /\.stories\.tsx$/,
            use: ["@storybook/source-loader"],
            include: [path.resolve(__dirname, "../src")],
          },
          {
            test: /\.tsx?$/,
            include: path.resolve(__dirname, "../src"),
            use: [
              {
                loader: "react-docgen-typescript-loader",
                options: {
                  tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: [".ts", ".tsx"],
      },
    });
  },
};
