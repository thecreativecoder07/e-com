import React from "react";
import Link from "next/link";
import AddToCartBtn from "../cart/addToCartBtn";

type ProductCardProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  images: string;
};

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max)}...` : text;

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  rating,
  brand,
  category,
  images,
}) => {
  return (
    <div className="card-wrapper h-100">
      <Link href={`/products/${id}`} className="text-decoration-none">
        <img
          src={images}
          alt={title || "Product image"}
          className="card-img-top"
          loading="lazy"
        />
      </Link>

      <div className="card-body d-flex flex-column h-100">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge bg-secondary text-dark">{category}</span>
          <span className="rating">{rating.toFixed(1)} ⭐</span>
        </div>

        <Link href={`/products/${id}`} className="text-decoration-none text-dark">
          <h5 className="card-title">{truncate(title, 25)}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{brand}</h6>
          <p className="card-text">{truncate(description, 80)}</p>
        </Link>

        <div className="mt-auto pt-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="price mb-0">${price.toFixed(2)}</h5>
            <AddToCartBtn id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
