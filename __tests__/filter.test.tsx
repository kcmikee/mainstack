import Filter from "@/ui/filter/Filter";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { debug } from "jest-preview";

describe("Filter", () => {
  it("should work as expected", () => {
    // Arrange
    render(<Filter />);
    debug();
  });
  it("should get text id of filter-type", () => {
    // Arrange
    render(<Filter />);
    const getId = screen.getByTestId("filtertype");
    expect(getId).toBeInTheDocument();
    debug();
  });
  it("should get filter of status", () => {
    // Arrange
    render(<Filter />);
    const getId = screen.getByRole("filter-status");
    expect(getId).toBeInTheDocument();
    debug();
  });
});
