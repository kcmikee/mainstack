import Transactions from "@/ui/transactions";
import { render, screen } from "@testing-library/react";
import { debug } from "jest-preview";

describe("Side option", () => {
  it("should work as expected", () => {
    // Arrange
    render(<Transactions />);
    debug();
  });
  it("should get the text 'Your transactions for the last 7 days'", () => {
    // Arrange
    render(<Transactions />);
    const getText = screen.getByText("Your transactions for the last 7 days");
    expect(getText).toBeInTheDocument();
    // debug();
  });
});
