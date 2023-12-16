import { getFiltersQuantity } from "./index.js"; // Replace with the correct path

describe("getFiltersQuantity", () => {
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
