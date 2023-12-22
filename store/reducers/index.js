"use client";
import * as TYPES from "../types";

const initialState = {
  businesses: [],
  viewedBusinesses: [],
  businessDetail: {},
  businessReviews: [],
  isLoading: false,
  isLoadingDetail: false,
  isLoadingReviews: false,
  totalResults: 0,
};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_BUSINESS:
      return {
        ...state,
        isLoading: false,
        businesses: action.payload.businesses,
        totalResults: action.payload.totalResults,
      };
    case TYPES.SET_REVIEWS:
      return {
        ...state,
        businessReviews: action.payload,
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
