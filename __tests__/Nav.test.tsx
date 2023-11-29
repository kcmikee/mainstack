import Nav from "@/ui/nav";
import { render, screen } from "@testing-library/react";
import { debug } from "jest-preview";

describe("Nav", () => {
  it("should work as expected", () => {
    // Arrange
    render(<Nav />);
    debug();
  });
  it("should get text id of navId", () => {
    // Arrange
    render(<Nav />);
    const getId = screen.getByTestId("navId");
    expect(getId).toBeInTheDocument();
    // debug();
  });
  it("should get role of nav", () => {
    // Arrange
    render(<Nav />);
    const getId = screen.getByRole("nav");
    expect(getId).toBeInTheDocument();
    // debug();
  });
});
