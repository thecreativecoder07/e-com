import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import styles from "./productPage.module.css";
import Header from "../../components/header";
import AddToCartBtn from "../../components/cart/addToCartBtn";
import Footer from "../../components/footer";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  images: string[];
  category: string;
  rating: number;
  stock: number;
  brand: string;
}

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const {
    title,
    description,
    price,
    discountPercentage,
    images,
    category,
    rating,
    stock,
    brand,
  } = product;

  const discountedPrice = discountPercentage
    ? (price * (100 - discountPercentage)) / 100
    : price;

  return (
    <>
      <Head>
        <title>{title} | Product Detail</title>
        <meta name="description" content={description} />
      </Head>

      <Header />

      <div className="container-lg py-5">
        <div className="row g-4">
          {/* Image Gallery */}
          <div className="col-lg-6">
            <div className={`${styles.mainImageContainer} card mb-3`}>
              <img
                src={images[selectedImage]}
                alt={`${title} image`}
                className={`${styles.mainImage} img-fluid rounded`}
              />
            </div>
            <div className="d-flex overflow-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`${styles.thumbnail} ${selectedImage === idx ? styles.activeThumbnail : ""} me-2 flex-shrink-0`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="img-fluid rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="card p-4 h-100">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="badge bg-secondary mb-2 text-capitalize">{category}</span>
                  <h1 className="h2 fw-bold">{title}</h1>
                  <div className="d-flex align-items-center mb-3">
                    <div className="text-warning me-2">
                      <small>Rating: {rating.toFixed(1)} / 5</small>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted mb-4">{description}</p>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-1">
                  <span className="h3 fw-bold me-2">${discountedPrice.toFixed(2)}</span>
                  {discountPercentage && (
                    <>
                      <span className="text-decoration-line-through text-muted me-2">
                        ${price.toFixed(2)}
                      </span>
                      <span className="badge bg-success">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className={`small ${stock > 0 ? "text-success" : "text-danger"}`}>
                  {stock > 0 ? `${stock} in stock` : "Out of stock"}
                </p>
              </div>

              <div className="mb-4">
                <AddToCartBtn id={product.id} />
              </div>

              <div className="mt-4 pt-4 border-top">
                <h5 className="mb-3">Product Details</h5>
                <div className="row">
                  <DetailItem label="Brand" value={brand} />
                  <DetailItem label="Category" value={category} />
                  <DetailItem label="Availability" value={stock > 0 ? "In Stock" : "Out of Stock"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="col-md-6 mb-2">
    <p className="small text-muted mb-1">{label}</p>
    <p className="mb-3 text-capitalize">{value}</p>
  </div>
);

// SSR fetch
export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({ params }) => {
  const id = params?.id;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) return { notFound: true };

    const product: Product = await res.json();
    return { props: { product } };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };
  }
};

export default ProductPage;
