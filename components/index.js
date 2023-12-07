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
import cx from "classnames";
/*
import Detail from "./Detail";*/
import {
  getBusiness,
  getReviews,
  initLoading,
  getDetail,
} from "@store/actions/homeActions.js";
import { getFiltersQuantity } from "@libs/index.js";

/**
 * Principal Body of the website.
 * @component
 * @param {Function} getBusiness - Obtains the business
 * @param {Boolean} initLoading - Initialize the loading when the user make a search
 * @param {Function} getDetail - Obtains the details of the business selected
 * @param {Function} getReviews - Obtains the reviews from the business selected
 * @param {Object} data - Global information about the business and charging status
 * @param {Boolean} data.isLoading - Indicate if it's loading a search
 * @param {Object} data.business - Object with all the information about the business
 * @param {Boolean} data.business.image_url - image url of the business
 * @param {String} data.business.name - Name of the business
 * @param {Object} data.business.location - address of the business
 * @param {Array} data.business.location.display_address - display address of the business
 * @param {Array} data.business.categories - Categories of the business
 * @param {String} data.business.display_phone - Display phone number of the business
 * @param {Number} data.business.review_count - Number of reviews for the business
 * @param {Number} data.business.rating - Rating of the business
 * @param {Boolean} data.business.is_closed - Indicates if the business is closed
 * @param {Array} data.business.transaction - Contains the transaction that the business allows
 * @param {Array} data.business.price - Indicates how expensive the business is.
 * @returns {JSX.Element} The rendered component.
 */
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
      <div className={styles.content}>
        <div className={cx("container", styles.contentContainer)}>
          <Filter
            filters={filters}
            setFilter={setFilter}
            filtersQuantity={filtersQuantity}
            isSearchMobileOpen={isSearchMobileOpen}
          />
          {isLoading ? (
            <Loading />
          ) : (
            <section
              className={cx(styles.cardContainer, {
                [styles.isSearchMobileOpen]: isSearchMobileOpen,
              })}
            >
              {businesses.map((business, i) => (
                <Card
                  business={business}
                  key={business.id}
                  viewBusiness={handleViewBusiness}
                  viewed={viewedBusinesses.includes(business.id)}
                />
              ))}
            </section>
          )}
        </div>
      </div>

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
