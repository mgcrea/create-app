import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "src/App";
import { describe, expect, test } from "vitest";

describe("<App />", () => {
  test("loads and displays greeting", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toHaveTextContent("count is 2");
  });
});
