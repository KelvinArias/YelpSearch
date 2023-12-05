"use client";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "./header";
import TitleSearch from "./titleSearch";
import { listValues } from "@const/index.js";
import Card from "./card";
import Loading from "./dumb/loading";
import Filter from "./filter";
/*
import Detail from "./Detail";*/
import {
  getBusiness,
  getReviews,
  initLoading,
  getDetail,
} from "@store/actions/homeActions.js";
import { getFiltersQuantity } from "@libs/index.js";

const Main = ({ getBusiness, initLoading, getDetail, getReviews, data }) => {
  const [searchValue, setSearch] = useState("Seattle");
  const [sortValue, setSort] = useState(listValues[0]);
  const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);
  const [filters, setFilter] = useState({});
  const filtersQuantity = getFiltersQuantity(filters);
  const [openDetail, setOpen] = useState(false);
  const {
    isLoading,
    businesses,
    viewedBusinesses,
    businessDetail,
    isLoadingDetail,
  } = data;

  const handleInit = () => {
    getBusiness(searchValue);
    initLoading({ isLoading: true });
  };

  const handleViewBusiness = ({ alias }) => {
    getDetail(alias);
    getReviews(alias);
    initLoading({ isLoadingReviews: true, isLoadingDetail: true });
    setOpen(true);
  };

  useEffect(handleInit, [searchValue, getBusiness, initLoading]);
  const handleSearch = (newValue) => {
    if (!newValue) {
      return setIsSearchMobileOpen(true);
    }
    setIsSearchMobileOpen(false);
    setSearch(newValue);
  };
  const handleClose = () => setOpen(false);

  return (
    <main>
      <Header
        setSearch={handleSearch}
        isSearchMobileOpen={isSearchMobileOpen}
        filterQuantity={filtersQuantity}
      />
      <TitleSearch
        searchValue={searchValue}
        sortValue={sortValue}
        setSort={setSort}
      />
      {isSearchMobileOpen && (
        <Filter
          filters={filters}
          setFilter={setFilter}
          filtersQuantity={filtersQuantity}
        />
      )}
      {isLoading && <Loading />}
      {!isLoading && !isSearchMobileOpen && (
        <section className={styles.cardContainer}>
          {businesses.map((business, i) => {
            i === 0 && console.log(business);
            return (
              <Card
                business={business}
                key={business.id}
                viewBusiness={handleViewBusiness}
                viewed={viewedBusinesses.includes(business.id)}
              />
            );
          })}
        </section>
      )}

      {/*
      {openDetail && (
        <Detail
          closeDetail={handleClose}
          business={businessDetail}
          isLoading={isLoadingDetail}
        />
      )}*/}
    </main>
  );
};

Main.propTypes = {
  data: PropTypes.object.isRequired,
  getBusiness: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
  initLoading: PropTypes.func.isRequired,
  getDetail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state,
});

export default connect(mapStateToProps, {
  getBusiness,
  initLoading,
  getDetail,
  getReviews,
})(Main);
