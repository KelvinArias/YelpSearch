/**
 * Function to calculate the quantity of active filters.
 *
 * @function
 * @param {Object} filters - The filters object.
 * @returns {number} The quantity of active filters.
 */
export const getFiltersQuantity = (filters) => {
  let quantity = 0;
  const copyFilters = filters || {};

  Object.keys(copyFilters).forEach((key) => {
    if (Array.isArray(copyFilters[key])) {
      quantity += copyFilters[key].length;
    } else {
      quantity++;
    }
  });

  return quantity;
};

/**
 * Retrieves the current geographical location of the device using the Geolocation API.
 *
 * @returns {Promise<{ latitude: number, longitude: number }>} - A Promise that resolves to an object
 * containing the latitude and longitude of the current location.
 * @rejects {string} - Rejected with an error message if Geolocation is not supported or if an error occurs during retrieval.
 *
 * @example
 * try {
 *   const location = await getCurrentLocation();
 *   console.log(location.latitude, location.longitude);
 * } catch (error) {
 *   console.error(error);
 * }
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    // Check if the Geolocation API is supported by the browser
    if ("geolocation" in navigator) {
      // Get the current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // The latitude and longitude are available in the position.coords object
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error.message);
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

/**
 * Function to calculate the quantity of active filters.
 *
 * @function
 * @param {Object} coordinates - The business coordinates.
 * @param {number} coordinates.latitude - The latitude of the business.
 * @param {number} coordinates.longitude - The longitude of the business.
 * @param {Object} geolocation - The current location of the user.
 * @param {number} geolocation.latitude - the latitude of the user.
 * @param {number} geolocation.longitude - the longitude of the user.
 * @param {status} geolocation.status - indicates whether the geolocation is active or not.
 * @returns {string} The quantity of active filters.
 */
export const getMapDirection = (
  { latitude = 0, longitude = 0 },
  { latitude: geoLatitude, longitude: geoLongitude, status }
) => {
  const origin = status && `${geoLatitude},${geoLongitude}`;
  const destination = `${latitude},${longitude}`;
  return status
    ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`
    : "";
};

/**
 * Helper function to get the day name from the day number.
 *
 * @param {number} day - The day number (0-6).
 * @returns {string} - The name of the day.
 */
export const getDayName = (day) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
};

/**
 * Helper function to format time in HH:MM AM/PM format.
 *
 * @param {number} value - The time value in HHMM format.
 * @returns {string} - The formatted time string.
 */
export function formatTime(value) {
  // Number must be a positive number between 0 and 2360 otherwise it will return undefined.
  const hourLimit = 2360;
  if (value < 0 || value > hourLimit || !Number.isInteger(value))
    return undefined;

  // Convert the value to a string
  const stringValue = value.toString();

  // Extract hours and minutes
  const hours = stringValue.padStart(4, "0").substring(0, 2);
  const minutes = stringValue.padStart(4, "0").substring(2);

  // Convert hours to 12-hour format
  const formattedHours = (parseInt(hours) % 12 || 12)
    .toString()
    .padStart(2, "0");

  // Determine AM/PM
  const period = parseInt(hours) < 12 ? "AM" : "PM";

  // Return the formatted time string
  return `${formattedHours}:${minutes} ${period}`;
}

/**
 * Formats a filters object into a string representation.
 *
 * @param {Object} filters - The filters object to be formatted.
 * @returns {string} - The formatted string representation of the filters.
 */
export function formatFiltersToString(filters) {
  let formatFilters = "";

  Object.keys(filters).forEach((key) => {
    // Transform the arrays into strings separated by spaces
    if (Array.isArray(filters[key])) {
      formatFilters += `, ${key}: "${filters[key].join(",")}"`;
    }
    if (typeof filters[key] === "number") {
      formatFilters += `, ${key}: ${filters[key]}`;
    }
    if (typeof filters[key] === "string") {
      formatFilters += `, ${key}: "${filters[key]}"`;
    }
  });

  return formatFilters;
}
