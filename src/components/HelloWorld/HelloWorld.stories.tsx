import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { HelloWorld } from ".";

export default {
  component: HelloWorld,
  decorators: [withKnobs],
  title: "HelloWorld",
};

export const Default = () => <HelloWorld />;
