import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("should render Docs text", () => {
  // Arrange
  // Render the Home component
  render(<Home />);

  // Act
  // Get the element with the text "Docs"
  const myElem = screen.getByText("Docs");

  // Assert
  // Check if the element is in the document
  expect(myElem).toBeInTheDocument();
});

//
//In this code, we are testing the Home component to see if it renders the text "Docs".
//
//The comments provide a clear explanation of each section of the test:
//
//1. Arrange: Set up the necessary conditions for the test. In this case, we render the Home component.
//2. Act: Perform the action we want to test. In this case, we get the element with the text "Docs".
//3. Assert: Check if the expected outcome occurred. In this case, we check if the element is in the document.
//
//This approach ensures that the test is clear, concise, and easy to understand..</s>
