import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  async function getProducts() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProducts(data.products);
  }

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="display-6 text-center my-3">Products</h2>
        {products.map((product, index) => {
          return (
            <div className="row " key={index}>
              <div
                className="card col-3 justify-content-center"
                style={{ width: "20rem" }}
              >
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <h6>${product.price}</h6>
                  <p className="card-text">{product.description}</p>
                  <a href="#" className="btn btn-dark">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Products;
