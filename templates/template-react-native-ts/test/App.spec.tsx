import { describe, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { App } from "src/App";

describe("<App />", () => {
  test("has a functional button", async () => {
    render(<App />);

    fireEvent.press(screen.getByTestId("button"));
    fireEvent.press(screen.getByTestId("button"));

    expect(screen.getByTestId("button")).toHaveTextContent("count is 2");
  });
});
