'use client';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getCategoryList } from "../../redux/thunk/productThunk";
import LoadingSpinner from "@/utils/loadingSpinner";
import Link from "next/link";

const CategoryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, error, categoryLoading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(getCategoryList());
    }
  }, [categories, dispatch]);

  if (categoryLoading) {
    return (
      <div className="container-lg mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-lg mt-5">
        <div className="alert alert-danger text-center">Failed to load categories.</div>
      </div>
    );
  }

  return (
    <div className="container-lg">
      <div className="text-center mb-5 mt-5">
        <h2 className="display-5 fw-bold">All Categories</h2>
        <p className="text-muted">Discover our premium categories</p>
      </div>

      <ul className="categories-list list-unstyled d-flex flex-wrap justify-content-center gap-3">
        {categories?.map((item: string, index: number) => (
          <li key={index}>
            <Link
              href={`products/category/${item}`}
              className="text-decoration-none text-white"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
