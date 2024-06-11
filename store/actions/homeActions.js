import * as TYPE from "../types";
import { formatFiltersToString } from "@libs/index";

const endpoint = "http://localhost:8080";

export const getBusiness = (filters) => async (dispatch) => {
  try {
    console.log(filters);
    const url = formatFiltersToString(new URL(endpoint + "/search"), filters);
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    dispatch({
      type: TYPE.SET_BUSINESS,
      payload: {
        totalResults: data.total,
        businesses: data.businesses,
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
export const initLoading = (loadingToInit) => ({
  type: TYPE.INIT_LOADING,
  loadingToInit,
});

export const getDetail = (alias) => async (dispatch) => {
  try {
    const url = new URL(endpoint + "/business/" + alias);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    dispatch({
      type: TYPE.SET_DETAIL,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReviews = (alias) => async (dispatch) => {
  try {
    const url = new URL(endpoint + "/business/" + alias + "/reviews");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    dispatch({
      type: TYPE.SET_REVIEWS,
      payload: data.reviews,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getGoogleApi = () => async (dispatch) => {
  try {
    const url = new URL(endpoint + "/googleApiKey");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.text();
    dispatch({
      type: TYPE.SET_GOOGLE_API,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
