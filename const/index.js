export const starsInfo = [
  { id: "star5", value: 5, htmlFor: "star5", title: "Awesome" },
  { id: "star4half", value: 4.5, htmlFor: "star4half", title: "pretty good" },
  { id: "star4", value: 4, htmlFor: "star4", title: "good" },
  {
    id: "star3half",
    value: 3.5,
    htmlFor: "star3half",
    title: "Meh - 3.5 stars",
  },
  { id: "star3", value: 3, htmlFor: "star3", title: "Meh - 3 stars" },
  {
    id: "star2half",
    value: 2.5,
    htmlFor: "star2half",
    title: "Kinda bad - 2.5 stars",
  },
  { id: "star2", value: 2, htmlFor: "star2", title: "Kinda bad - 2 stars" },
  {
    id: "star1half",
    value: 1.5,
    htmlFor: "star1half",
    title: "Suck big time - 1.5 stars",
  },
  { id: "star1", value: 1, htmlFor: "star1", title: "Suck big time - 1 star" },
].sort((a, b) => a.value - b.value);

// Pagination
export const DEFAULT_PAGE_VALUE = 1;
export const BUSINESS_PER_PAGE = 10;

// Filter
export const KEY_RADIUS = "radius";
export const KEY_CATEGORIES = "categories";
export const KEY_SUGGESTED = "attributes";
export const KEY_PRICE = "price";
export const DEFAULT_LOCATION_VALUE = "Seattle";
export const DEFAULT_SORT_VALUE = "best_match";

export const sortBy = {
  best_match: "Best Match",
  rating: "Rating",
  review_count: "Review Count",
  distance: "Distance",
};
export const prices = [1, 2, 3, 4];
export const suggestedValues = {
  hot_and_new: "Popular",
  deals: "Deals",
  open_to_all: "Open To All",
  reservation: "Reservation",
};
export const categories = {
  acaibowls: "Acai Bowls",
  wraps: "Wraps",
  bars: "Bars",
  nightLife: "Night Life",
  sushibars: "Sushi Bars",
  seafood: "Seafood",
  japanese: "Japanese",
  juicebars: "Juice Bars & Smoothies",
  chinese: "Chinese",
  coffeetea: "Coffee & tea",
  peruvian: "Peruvian",
  pizza: "Pizza",
  mexican: "Mexican",
};
// based on meters transformed into miles
export const radius = {
  500: "0.5Mi",
  1609: "1Mi",
  3218: "2Mi",
  8046: "5Mi",
  16093: "10Mi",
};
