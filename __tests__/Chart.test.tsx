import Calendar from "@/ui/calendar/Calendar";

import { render, screen } from "@testing-library/react";
import { debug } from "jest-preview";

describe("Chart", () => {
  it("should work as expected", () => {
    render(<Calendar selectedDay={new Date()} setSelectedDay={() => {}} />);
    debug();
  });
});
