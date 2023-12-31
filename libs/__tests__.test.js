import {
  getFiltersQuantity,
  getDayName,
  formatTime,
  formatFiltersToString,
} from "./index.js"; // Replace with the correct path

describe("getFiltersQuantity", () => {
  // Test case 1: No filters
  it("No filters", () => {
    const filters = {};
    const result = getFiltersQuantity(filters);
    expect(result).toBe(0);
  });

  // Test case 2: One filter with a single value
  it("One filter with a single value", () => {
    const filters = { categories: ["electronics"] };
    const result = getFiltersQuantity(filters);
    expect(result).toBe(1);
  });

  // Test case 3: One filter with multiple values
  it("One filter with multiple values", () => {
    const filters = { categories: ["restaurants", "mexican", "Seafood"] };
    const result = getFiltersQuantity(filters);
    expect(result).toBe(3);
  });

  // Test case 4: Multiple filters with a mix of single and multiple values
  it("Multiple filters with a mix of single and multiple values", () => {
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
  it("Undefined filters", () => {
    const filters = undefined;
    const result = getFiltersQuantity(filters);
    expect(result).toBe(0);
  });

  // Test case 6: Edge case - null filters
  it("Null filters", () => {
    const filters = null;
    const result = getFiltersQuantity(filters);
    expect(result).toBe(0);
  });
});

describe("getDayName function", () => {
  it("should return the correct day name for a given day number", () => {
    // Test each day of the week (0-6)
    expect(getDayName(0)).toBe("Sunday");
    expect(getDayName(1)).toBe("Monday");
    expect(getDayName(2)).toBe("Tuesday");
    expect(getDayName(3)).toBe("Wednesday");
    expect(getDayName(4)).toBe("Thursday");
    expect(getDayName(5)).toBe("Friday");
    expect(getDayName(6)).toBe("Saturday");
  });

  it("should return undefined for invalid day numbers", () => {
    // Test invalid day numbers
    expect(getDayName(-1)).toBeUndefined();
    expect(getDayName(7)).toBeUndefined();
    expect(getDayName(42)).toBeUndefined();
  });
});

describe("formatTime function", () => {
  it("should format time in HH:MM AM/PM format", () => {
    // Test cases for different time values
    expect(formatTime(1200)).toBe("12:00 PM");
    expect(formatTime(900)).toBe("09:00 AM");
    expect(formatTime(1430)).toBe("02:30 PM");
    expect(formatTime(2359)).toBe("11:59 PM");
    expect(formatTime(0)).toBe("12:00 AM");
  });

  it("should handle single-digit hours and minutes", () => {
    // Test cases for single-digit hours and minutes
    expect(formatTime(5)).toBe("12:05 AM");
    expect(formatTime(30)).toBe("12:30 AM");
    expect(formatTime(815)).toBe("08:15 AM");
  });

  it("should handle values outside the valid range", () => {
    // Test cases for values outside the valid range
    expect(formatTime(-1)).toBeUndefined();
    expect(formatTime(2400)).toBeUndefined();
    expect(formatTime("invalid")).toBeUndefined();
  });
});

describe("formatFiltersToString function", () => {
  it("should format filters object into a string representation", () => {
    const filters = {
      category: ["food", "drink"],
      price: 20,
      location: "New York",
    };

    const result = formatFiltersToString(filters);

    // Check if the result contains expected parts
    expect(result).toContain('category: "food,drink"');
    expect(result).toContain("price: 20");
    expect(result).toContain('location: "New York"');

    // Check if the result starts with a comma and doesn't end with a comma
    expect(result.startsWith(",")).toBe(true);
    expect(result.endsWith(",")).toBe(false);
  });

  it("should handle empty filters object", () => {
    const filters = {};
    const result = formatFiltersToString(filters);
    expect(result).toBe("");
  });

  it("should handle filters with different data types", () => {
    const filters = {
      category: ["food", "drink"],
      numberFilter: 42,
      stringFilter: "test",
    };

    const result = formatFiltersToString(filters);

    // Check if the result contains expected parts
    expect(result).toContain('category: "food,drink"');
    expect(result).toContain("numberFilter: 42");
    expect(result).toContain('stringFilter: "test"');

    // Check if the result starts with a comma and doesn't end with a comma
    expect(result.startsWith(",")).toBe(true);
    expect(result.endsWith(",")).toBe(false);
  });
});
