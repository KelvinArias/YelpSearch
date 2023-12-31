import * as TYPE from "../types";
const endpoint = "http://localhost:4000/graphql";
import { GraphQLClient } from "graphql-request";
import { formatFiltersToString } from "@libs/index";

export const getBusiness = (filters) => async (dispatch) => {
  const formatFilters = formatFiltersToString(filters);

  try {
    const query = `
            {
                search(${formatFilters}){
                    businesses {
                      id
                      name
                      alias
                      categories{
                        title
                      }
                      coordinates {
                        latitude
                        longitude
                      }
                      rating
                      review_count
                      display_phone
                      image_url
                      location{
                        display_address
                      }
                      is_closed
                      transactions
                      price
                    }
                    total
                }
            }
        `;
    const graphQLClient = new GraphQLClient(endpoint, { method: "POST" });
    const data = await graphQLClient.request(query);

    dispatch({
      type: TYPE.SET_BUSINESS,
      payload: {
        totalResults: data.search.total,
        businesses: data.search.businesses,
      },
    });
  } catch (error) {
    dispatch({
      type: TYPE.SET_BUSINESS,
      payload: {
        totalResults: 0,
        businesses: [],
      },
    });
    console.log(error);
  }
};

export const getReviews = (alias) => async (dispatch) => {
  try {
    const query = `
            {
                getReviews(alias: "${alias}"){
                    id
                    rating
                    user {
                        id
                        name
                        profile_url
                        image_url
                    }
                    text
                    time_created
                }
            }
        `;
    const graphQLClient = new GraphQLClient(endpoint, { method: "POST" });
    const data = await graphQLClient.request(query);
    dispatch({
      type: TYPE.SET_REVIEWS,
      payload: data.getReviews,
    });
  } catch (error) {
    console.log(error);
  }
};

export const initLoading = (loadingToInit) => ({
  type: TYPE.INIT_LOADING,
  loadingToInit,
});

export const getDetail = (alias) => async (dispatch) => {
  const query = `
    {
        getDetail(alias: "${alias}") {
            id
            name
            alias
            rating
            is_closed
            coordinates {
              latitude
              longitude
            }
            hours{
                open{
                    is_overnight
                    start
                    end
                    day
                }
                hours_type
                is_open_now
            }
            photos
            price
            review_count
            display_phone
            image_url
            location{
                display_address
            }
        }
    }
    `;
  try {
    const graphQLClient = new GraphQLClient(endpoint, { method: "POST" });
    const data = await graphQLClient.request(query);
    dispatch({
      type: TYPE.SET_DETAIL,
      payload: data.getDetail,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getGoogleApi = () => async (dispatch) => {
  const query = `{ getGoogleAPI }`;
  try {
    const graphQLClient = new GraphQLClient(endpoint, { method: "POST" });
    const data = await graphQLClient.request(query);

    dispatch({
      type: TYPE.SET_GOOGLE_API,
      payload: data.getGoogleAPI,
    });
  } catch (error) {
    console.log(error);
  }
};
