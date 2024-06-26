require("dotenv").config();
const { createServer } = require("node:http");
const { createSchema, createYoga } = require("graphql-yoga");
const yelp = require("yelp-fusion");
const client = yelp.client(process.env.API_KEY);
// obsolete server in graphql
const typeDefs = `
    type Query {
      search(location: String, latitude: Float, longitude: Float, price: String, attributes: String, categories: String, radius: Int, sort_by: String, limit: Int, offset: Int): SearchResult
      getDetail(alias: String): Detail
      getReviews(alias: String): [Review]
      getGoogleAPI: String
    }

    type SearchResult {
      businesses: [Business]
      total: Int
    }

    type Hour {
      open: [Time]
      hours_type: String
      is_open_now: Boolean
    }
    
    type Business {
      id: ID!
      name: String
      alias: String
      categories: [Category]
      coordinates: Coordinate
      hours: [Hour]
      rating: Float
      review_count: Int
      display_phone: String
      image_url: String
      location: Location
      is_closed: Boolean
      transactions: [String]
      price: String
    }

    type Coordinate {
      latitude: Float
      longitude: Float
    }

    type Category {
      title: String
    }

    type Time {
      is_overnight: Boolean
      start: Int
      end: Int
      day: Int
    }

    type Detail {
      id: ID!
      name: String
      alias: String
      rating: Float
      is_closed: Boolean
      photos: [String]
      hours:[Hour]
      price: String
      review_count: Int
      display_phone: String
      image_url: String
      location: Location
      coordinates: Coordinate
    }

    type Location {
      display_address: [String!]
    }

    type User {
      id: ID!
      name: String
      profile_url: String
      image_url: String
    }

    type Review {
      id: ID!
      rating: Float
      user: User
      text: String
      time_created: String
    }
`;

const resolvers = {
  Query: {
    search: async (_, filters) => {
      const resp = await client.search(filters);
      return {
        businesses: resp.jsonBody.businesses,
        total: resp.jsonBody.total,
      };
    },
    getDetail: async (_, { alias }) => {
      const resp = await client.business(alias);
      return resp.jsonBody;
    },
    getReviews: async (_, { alias }) => {
      const resp = await client.reviews(alias);
      return resp.jsonBody.reviews;
    },
    getGoogleAPI: () => process.env.GOOGLE_API,
  },
};

const schema = createSchema({ typeDefs, resolvers });
const yoga = createYoga({ schema });

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

// Start the server and you're done!
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
