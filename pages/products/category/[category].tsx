import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import Header from "../../../components/header";
import ProductCard from "../../../components/product/productCard";
import Footer from "../../../components/footer";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  images?: string[];
  image?: string;
  category: string;
  rating: number;
  stock: number;
  brand: string;
}

interface ProductByCategoryPageProps {
  products: Product[];
}

const ProductByCategory: React.FC<ProductByCategoryPageProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Products By Category</title>
        <meta name="description" content="Product list by category" />
      </Head>
      <Header />
      <div className="container-lg py-5">
        <div className="row g-4">
          {products.map((product) => (
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
      </div>
      <Footer />
    </>
  );
};

export default ProductByCategory;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("Category param:", context.params);

  const { category } = context.params as { category: string };

  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);
    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();

    return {
      props: { products: data.products },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      notFound: true,
    };
  }
};
