"use client";
import { DEFAULT_PAGE_VALUE } from "@const/index";
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
