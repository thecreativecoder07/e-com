"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllProducts } from "../../redux/thunk/productThunk";
import LoadingSpinner from "@/utils/loadingSpinner";

const ProductCard = React.lazy(() => import("./productCard"));

const Product: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch<AppDispatch>();
  const { products, total, productLoading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;
    dispatch(getAllProducts({ limit: itemsPerPage, skip }));
  }, [currentPage, dispatch]);

  const totalPages = Math.ceil(total / itemsPerPage);

  const renderPagination = () => {
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

  return (
    <div className="container-lg py-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">All Products</h2>
        <p className="text-muted">Discover our premium collection</p>
      </div>

      {productLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="alert alert-danger text-center">Failed to load products.</div>
      ) : (
        <>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="row g-4">
              {products.map((product: any) => (
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
          </Suspense>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default Product;
