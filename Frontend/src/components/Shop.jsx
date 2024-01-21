import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Shop() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <div className="container ">
        <h1 className="display-6 text-center my-3">New Arrivals </h1>
        <div className="table-resopnsive">
          <table className="table table-hover table-bordered">
            <thead className="table-secondary">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Image</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>
                      <Link to={`/products/${item.image}`}>
                        {" "}
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </Link>
                    </td>
                    <td>{`${item.rating.rate}/${item.rating.count}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <Routes>
          <Route path="/products/:imageID" element={<FakeStoreImg />} />
        </Routes> */}
      </div>
      <Footer />
    </>
  );
}

export default Shop;
