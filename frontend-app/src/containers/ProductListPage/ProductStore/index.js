import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../../actions";
import Layout from "../../../components/Layout";
import { generatePublicURL } from "../../../urlConfig";
import "./style.css";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";
import Price from "../../../components/UI/Price";
import Rating from "../../../components/UI/Ratings";

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under20k: 20000,
    under50k: 50000,
    above50k: 500001,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={
              props.match.params.slug +
              " mobile " +
              (priceRange[key] != 500001
                ? "under " + priceRange[key]
                : "above 50000")
            }
            headerRight={<button>View All</button>}
          >
            {/* {console.log(headerLeft)} */}

            <div style={{ display: "flex", textDecoration: "none" }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{ display: "block" }}
                  className="productContainer"
                >
                  <div className="productImgContainer">
                    <img
                      src={generatePublicURL(product.productImages[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <Price value={product.price} />
                    <span className="productmrp">
                      <Price value={product.mrp} />
                    </span>
                    <div style={{ margin: "5px 0" }}>{product.name}</div>
                    <div>
                      <Rating value={product.ratings} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default ProductStore;
