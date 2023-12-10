require("dotenv").config();
const { createServer } = require("node:http");
const { createSchema, createYoga } = require("graphql-yoga");
const yelp = require("yelp-fusion");
const client = yelp.client(process.env.API_KEY);

const typeDefs = `
    type Query {
      search(location: String, price: String, attributes: String, categories: String, radius: Int): [Business]
      getDetail(alias: String): Detail
      getReviews(alias: String): [Review]
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
      is_closed: String
      photos: [String]
      hours:[Hour]
      price: String
      review_count: Int
      display_phone: String
      image_url: String
      location: Location
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
      console.log(filters);
      const resp = await client.search({ ...filters, limit: 10 });
      return resp.jsonBody.businesses;
    },
    getDetail: async (_, { alias }) => {
      const resp = await client.business(alias);
      return resp.jsonBody;
    },
    getReviews: async (_, { alias }) => {
      const resp = await client.reviews(alias);
      return resp.jsonBody.reviews;
    },
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
