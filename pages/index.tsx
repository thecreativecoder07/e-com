import Footer from "../components/footer";
import Header from "../components/header";
import CategoryList from "../components/product/categoryList";
import Product from "../components/product/product";

const Home = () => {
  return (
    <>
      <Header />
      <CategoryList />
      <Product />
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
