"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getAllProducts,
  getSortedProducts,
  searchProducts,
} from "../../redux/thunk/productThunk";
import LoadingSpinner from "@/utils/loadingSpinner";
import ProductCard from "./productCard";

type SortOption = {
  title: "price";
  order: "asc" | "desc";
};

const Product: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const {
    products,
    total,
    productLoading,
    error,
    searchResults,
    searchLoading,
    searchError,
  } = useSelector((state: RootState) => state.products);

  const totalPages = useMemo(() => Math.ceil(total / itemsPerPage), [total]);

  const productsToShow = useMemo(() => {
    return debouncedQuery.trim() !== "" ? searchResults : products;
  }, [debouncedQuery, products, searchResults]);

  const isLoading = debouncedQuery.trim() !== "" ? searchLoading : productLoading;
  const loadError = debouncedQuery.trim() !== "" ? searchError : error;

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch all products
  useEffect(() => {
    if (debouncedQuery.trim() === "" && filterQuery.trim() === "") {
      const skip = (currentPage - 1) * itemsPerPage;
      dispatch(getAllProducts({ limit: itemsPerPage, skip }));
    }
  }, [currentPage, debouncedQuery, filterQuery, dispatch]);

  // product search
  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      dispatch(searchProducts({ query: debouncedQuery }));
    }
  }, [debouncedQuery, dispatch]);

  // Handle sort
  const handleSortedProducts = ({ title, order }: SortOption) => {
    const query = `${title}_${order}`;
    setFilterQuery(query);
    setCurrentPage(1); 
    setShowFilter(false)
  };

  useEffect(() => {
    if (filterQuery.trim() !== "") {
      const [title, order] = filterQuery.split("_");
      dispatch(getSortedProducts({ title, order } as SortOption));
    }
  }, [filterQuery, dispatch]);

  const renderPagination = () => {
    if (debouncedQuery.trim() !== "") return null;

    const buttons = [];
    let startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`btn ${currentPage === i ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination mt-5 d-flex justify-content-center gap-2 flex-wrap">
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &laquo; Previous
        </button>

        {buttons}

        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="container-lg py-5">
      <div className="text-center mb-4">
        <h2 className="display-5 fw-bold">All Products</h2>
        <p className="text-muted">Discover our premium collection</p>

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex justify-content-center mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search products..."
              style={{ maxWidth: "350px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="position-relative">
            <button
              className="btn btn-secondary"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              Sort
            </button>
            {showFilter && (
              <ul className="filter-list bg-light border p-2 rounded shadow-sm position-absolute mt-2 z-3">
                <li
                  role="button"
                  className="mb-1"
                  onClick={() => handleSortedProducts({ title: "price", order: "asc" })}
                >
                  Price: Low to High
                </li>
                <li
                  role="button"
                  onClick={() => handleSortedProducts({ title: "price", order: "desc" })}
                >
                  Price: High to Low
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : loadError ? (
        <div className="alert alert-danger text-center">{loadError}</div>
      ) : productsToShow.length === 0 ? (
        <div className="alert alert-info text-center">No products found.</div>
      ) : (
        <>
          <div className="row g-4">
            {productsToShow.map((product: any) => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 product-card"
                key={product.id}
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  rating={product.rating}
                  brand={product.brand}
                  category={product.category}
                  images={product.images?.[0] ?? ""}
                />
              </div>
            ))}
          </div>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default Product;
