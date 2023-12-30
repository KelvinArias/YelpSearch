"use client";
import React, { useState, Fragment, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "./header";
import TitleSearch from "./titleSearch";
import {
  DEFAULT_SORT_VALUE,
  DEFAULT_LOCATION_VALUE,
  DEFAULT_PAGE_VALUE,
  BUSINESS_PER_PAGE,
} from "@const/index";
import Card from "./card";
import Loading from "./dumb/loading";
import Filter from "./filter";
import cx from "classnames";
import { getCurrentLocation } from "@libs/index";
import {
  getBusiness,
  getReviews,
  initLoading,
  getDetail,
  getGoogleApi,
} from "@store/actions/homeActions.js";
import { getFiltersQuantity } from "@libs/index";
import Pagination from "./pagination/";
import Detail from "./detail/";

/**
 * Principal Body of the website.
 * @component
 * @param {Function} getBusiness - Obtains the business
 * @param {Boolean} initLoading - Initialize the loading when the user make a search
 * @param {Function} getDetail - Obtains the details of the business selected
 * @param {Function} getReviews - Obtains the reviews from the business selected
 * @param {Function} getGoogleApi - Get the google API KEY from the server to make the map works
 * @param {Object} data - Global information about the business and charging status
 * @param {Boolean} data.isLoading - Indicate if it's loading a search
 * @param {String} data.googleAPI - Google API key to make the map work
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
const Main = ({
  getBusiness,
  initLoading,
  getDetail,
  getReviews,
  getGoogleApi,
  data,
}) => {
  const [location, setLocation] = useState(DEFAULT_LOCATION_VALUE);
  const [sortValue, setSort] = useState(DEFAULT_SORT_VALUE);
  const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);
  const [filters, setFilter] = useState({});
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_VALUE);
  const filtersQuantity = getFiltersQuantity(filters);
  const [openDetail, setOpen] = useState(false);
  const headerRef = useRef(null);
  const [lastCardSelected, setLastCardSelected] = useState(null);
  const [geolocation, setCurrentLocation] = useState({
    status: false,
    latitude: 0,
    longitude: 0,
    geoIsLoading: true,
  });
  const isCurrentLocation =
    geolocation.status && location === DEFAULT_LOCATION_VALUE;
  const {
    isLoading,
    businesses,
    businessReviews,
    viewedBusinesses,
    businessDetail,
    isLoadingDetail,
    totalResults,
    isLoadingReviews,
    googleAPI,
  } = data;
  const notFound = businesses.length === 0;

  const handleViewBusiness = (card, alias) => {
    setLastCardSelected(card);
    initLoading({ isLoadingReviews: true, isLoadingDetail: true });
    getDetail(alias);
    getReviews(alias);
    setOpen(true);
  };

  const handleSearch = (page = DEFAULT_PAGE_VALUE) => {
    const { latitude, longitude, status, geoIsLoading } = geolocation;
    const useCurrentLocation = location === DEFAULT_LOCATION_VALUE && status;
    const newFilter = {
      ...filters,
      ...(useCurrentLocation ? { latitude, longitude } : { location }),
      sort_by: sortValue,
      limit: BUSINESS_PER_PAGE,
      offset: page * BUSINESS_PER_PAGE - BUSINESS_PER_PAGE,
    };

    initLoading({ isLoading: true });
    if (!geoIsLoading) {
      getBusiness(newFilter);
    }
  };

  // Initialize the google maps service
  useEffect(() => {
    getGoogleApi();
    getCurrentLocation()
      .then(({ latitude, longitude }) => {
        setCurrentLocation({
          latitude,
          longitude,
          status: true,
          geoIsLoading: false,
        });
      })
      .catch((error) => {
        setCurrentLocation((prev) => ({
          ...prev,
          status: false,
          geoIsLoading: false,
        }));
        console.error("Error getting location:", error);
      });
  }, [getGoogleApi]);

  useEffect(handleSearch, [
    location,
    filters,
    sortValue,
    getBusiness,
    initLoading,
    geolocation,
  ]);

  const handlePagination = (newPage) => {
    handleSearch(newPage);
    setCurrentPage(newPage);
  };

  const handleLocation = (newValue) => {
    if (!newValue) {
      return setIsSearchMobileOpen(true);
    }
    setIsSearchMobileOpen(false);
    setLocation(newValue);
  };

  const handleCloseDetail = () => {
    setOpen(false);
    setTimeout(() => {
      lastCardSelected.target.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 100);
  };

  return (
    <main>
      <Header
        setSearch={handleLocation}
        isSearchMobileOpen={isSearchMobileOpen}
        filterQuantity={filtersQuantity}
        headerRef={headerRef}
      />

      <Fragment>
        <TitleSearch
          location={location}
          sortValue={sortValue}
          setSort={setSort}
          isCurrentLocation={isCurrentLocation}
        />
        <div className={cx(styles.content)}>
          <div
            className={cx("container", styles.contentContainer, {
              [styles.isOpenDetail]: openDetail,
            })}
          >
            <Filter
              filters={filters}
              setFilter={setFilter}
              filtersQuantity={filtersQuantity}
              isSearchMobileOpen={isSearchMobileOpen}
              setIsSearchMobileOpen={setIsSearchMobileOpen}
              isLoading={isLoading}
              businessQuantity={businesses.length}
              headerRef={headerRef}
            />
            {isLoading || geolocation.geoIsLoading ? (
              <Loading width={100} height={100} />
            ) : notFound ? (
              <p className={styles.notFound}>
                There are not results for this search
              </p>
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
                    viewed={viewedBusinesses.includes(business.id)}
                    geolocation={geolocation}
                    onClick={handleViewBusiness}
                  />
                ))}

                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={totalResults}
                  pageSize={10}
                  onPageChange={handlePagination}
                />
              </section>
            )}
          </div>
        </div>
      </Fragment>
      {openDetail && (
        <Fragment>
          <div className={styles.mask} />
          {isLoadingDetail ? (
            <Loading width={100} height={100} />
          ) : (
            <Detail
              onClose={handleCloseDetail}
              business={businessDetail}
              isLoading={isLoadingDetail}
              geolocation={geolocation}
              reviews={businessReviews}
              isLoadingReviews={isLoadingReviews}
              googleAPI={googleAPI}
            />
          )}
        </Fragment>
      )}
    </main>
  );
};

Main.propTypes = {
  data: PropTypes.object.isRequired,
  getBusiness: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
  initLoading: PropTypes.func.isRequired,
  getDetail: PropTypes.func.isRequired,
  getGoogleApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state,
});

export default connect(mapStateToProps, {
  getBusiness,
  initLoading,
  getDetail,
  getReviews,
  getGoogleApi,
})(Main);
