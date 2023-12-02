export const listValues = ["Recommended", "Highest Rated", "Most Reviewed"];
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
