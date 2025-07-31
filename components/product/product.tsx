"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllProducts, searchProducts } from "../../redux/thunk/productThunk";
import LoadingSpinner from "@/utils/loadingSpinner";
import ProductCard from "./productCard";


const Product: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const {
    products,
    total,
    productLoading,
    error,
    searchResults,
    searchLoading,
    searchError,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      const skip = (currentPage - 1) * itemsPerPage;
      dispatch(getAllProducts({ limit: itemsPerPage, skip }));
    }
  }, [currentPage, debouncedQuery, dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      dispatch(searchProducts({ query: debouncedQuery }));
    }
  }, [debouncedQuery, dispatch]);

  const totalPages = Math.ceil(total / itemsPerPage);

  const renderPagination = () => {
    if (debouncedQuery.trim() !== "") return null;

    const pageButtons = [];
    let startPage = 1;

    if (totalPages > 5) {
      if (currentPage <= 3) {
        startPage = 1;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      } else {
        startPage = currentPage - 2;
      }
    }

    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
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

        {pageButtons}

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

  const productsToShow = debouncedQuery.trim() !== "" ? searchResults : products;
  const isLoading = debouncedQuery.trim() !== "" ? searchLoading : productLoading;
  const loadError = debouncedQuery.trim() !== "" ? searchError : error;

  return (
    <div className="container-lg py-5">
      <div className="text-center mb-4">
        <h2 className="display-5 fw-bold">All Products</h2>
        <p className="text-muted">Discover our premium collection</p>

        {/* Search input */}
        <div className="d-flex justify-content-center mb-4">
          <input
            type="search"
            className="form-control"
            placeholder="Search products..."
            style={{ maxWidth: "350px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
