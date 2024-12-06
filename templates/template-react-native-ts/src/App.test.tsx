import { expect, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { App } from "./App";

test("examples of some things", async () => {
  const expectedUsername = "Ada Lovelace";

  render(<App />);

  fireEvent.changeText(screen.getByTestId("input"), expectedUsername);
  fireEvent.press(screen.getByText("Print Username"));

  // Using `findBy` query to wait for asynchronous operation to finish
  const usernameOutput = await screen.findByTestId("printed-username");

  // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
  expect(usernameOutput).toHaveTextContent(expectedUsername);

  expect(screen.toJSON()).toMatchSnapshot();
});
