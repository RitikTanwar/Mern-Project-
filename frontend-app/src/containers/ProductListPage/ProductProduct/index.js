import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../../actions";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import Price from "../../../components/UI/Price";
import { Link } from "react-router-dom";
import Rating from "../../../components/UI/Ratings";

import "./style.css";
import { generatePublicURL } from "../../../urlConfig";

/**
 * @author
 * @function ProductPage
 **/

const ProductPage = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <Card
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
        }}
      >
        {product.products.map((product) => (
          <div className="caContainer">
            <Link
              className="caImgContainer"
              to={`/${product.slug}/${product._id}/p`}
            >
              <img src={generatePublicURL(product.productImages[0].img)} />
            </Link>
            <div>
              <div className="caProductName">{product.name}</div>
              {/* <div className="caProductPrice"> */}
              {/* <BiRupee /> */}
              <Price value={product.price} />
              {/* </div> */}
              <Rating value={product.ratings} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ProductPage;
