import { render, act } from "@testing-library/react";
import React, { useRef } from "react";
import { useClickOutside, getFiltersQuantity } from "./index.js"; // Replace with the correct path

// Mock callback function
const mockCallback = jest.fn();

// Mock the useRef hook
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: jest.fn(),
}));

describe("useClickOutside", () => {
  it("should call the callback when a click outside the ref element occurs", () => {
    // Arrange
    const ref = { current: document.createElement("div") };
    useRef.mockReturnValue(ref);

    render(
      <div>
        <div data-testid="inside-element" ref={ref}>
          Inside Element
        </div>
        <div data-testid="outside-element">Outside Element</div>
      </div>
    );

    // Act
    act(() => {
      // Initialize the hook
      const cleanup = useClickOutside(ref, mockCallback);

      // Simulate a click outside the ref element
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    // Assert
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe("useClickOutside", () => {
  // Test case 1: No filters
  test("No filters", () => {
    const filters = {};
    const result = getFiltersQuantity(filters);
    expect(result).toBe(0);
  });

  // Test case 2: One filter with a single value
  test("One filter with a single value", () => {
    const filters = { categories: ["electronics"] };
    const result = getFiltersQuantity(filters);
    expect(result).toBe(1);
  });

  // Test case 3: One filter with multiple values
  test("One filter with multiple values", () => {
    const filters = { categories: ["restaurants", "mexican", "Seafood"] };
    const result = getFiltersQuantity(filters);
    expect(result).toBe(3);
  });

  // Test case 4: Multiple filters with a mix of single and multiple values
  test("Multiple filters with a mix of single and multiple values", () => {
    const filters = {
      categories: ["restaurants", "mexican", "Seafood"],
      radius: 500,
      suggested: ["hot_and_new"],
      price: ["$", "$$"],
    };
    const result = getFiltersQuantity(filters);
    expect(result).toBe(7);
  });

  // Test case 5: Edge case - undefined filters
  test("Undefined filters", () => {
    const filters = undefined;
    const result = getFiltersQuantity(filters);
    expect(result).toBe(0);
  });

  // Test case 6: Edge case - null filters
  test("Null filters", () => {
    const filters = null;
    const result = getFiltersQuantity(filters);
    expect(result).toBe(0);
  });
});
