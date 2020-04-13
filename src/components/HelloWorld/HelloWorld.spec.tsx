import React from "react";
import renderer from "react-test-renderer";
import { HelloWorld } from "./HelloWorld";

it("HelloWorld.tsx", () => {
  renderer.create(<HelloWorld />);
});
