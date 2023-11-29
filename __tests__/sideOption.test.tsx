import SideOptions from "@/ui/sideOptions";
import { render, screen } from "@testing-library/react";
import { debug } from "jest-preview";

describe("Side option", () => {
  it("should work as expected", () => {
    // Arrange
    render(<SideOptions />);
    debug();
  });
  it("should get testid", () => {
    // Arrange
    render(<SideOptions />);
    const getText = screen.getByTestId("testId");
    expect(getText).toBeInTheDocument();
    // debug();
  });
});
