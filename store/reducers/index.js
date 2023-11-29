"use client";
import * as TYPES from "../types";
//import dataExample from "./dataExample"

const initialState = {
  businesses: [],
  viewedBusinesses: [],
  businessDetail: {},
  businessReview: [],
  isLoading: true,
  isLoadingDetail: true,
  isLoadingReviews: true,
};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_BUSINESS:
      return {
        ...state,
        businesses: action.payload,
        isLoading: false,
      };
    case TYPES.SET_REVIEWS:
      return {
        ...state,
        businessReview: action.payload,
        isLoadingReviews: false,
      };
    case TYPES.INIT_LOADING:
      return {
        ...state,
        ...action.loadingToInit,
      };
    case TYPES.SET_DETAIL:
      return {
        ...state,
        viewedBusinesses: [...state.viewedBusinesses, action.payload.id],
        businessDetail: action.payload,
        isLoadingDetail: false,
      };
    default:
      return state;
  }
}
