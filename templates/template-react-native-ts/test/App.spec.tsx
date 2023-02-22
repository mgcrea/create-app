import { fireEvent, render, screen } from "@testing-library/react-native";
import { App } from "src/App";

describe("<App />", () => {
  test("has a functional button", async () => {
    render(<App />);

    await fireEvent.press(screen.getByTestId("button"));
    await fireEvent.press(screen.getByTestId("button"));

    expect(screen.getByTestId("button")).toHaveTextContent("count is 2");
  });
});
