import React, { useEffect } from 'react'
import Layout from '../../components/Layout';
// import {composeWithDevTools} from 'redux-devtools-extension';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions';
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { generatePublicURL } from '../../urlConfig';
import { addItemsToCart } from '../../actions/cart';

const ProductDetails = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    // console.log('product',product);
    // console.log(product.roductDetails);

    useEffect(() => {
        const { productId } = props.match.params;
        // console.log(productId);
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailsById(payload))
    }, [])
    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }
    return (
        <Layout>
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {product.productDetails.productImages.map((thumb, index) => (
                            <div className="thumbnail active" >
                                <img src={generatePublicURL(thumb.img)} alt={thumb.img} />
                            </div>
                        ))}
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img
                                src={generatePublicURL(product.productDetails.productImages[0].img)}
                                alt={`${product.productDetails.productImages[0].img}`}
                            />
                        </div>

                        {/* action buttons */}
                        <div className="flexRow">
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{
                                    marginRight: "5px",
                                }}
                                icon={<IoMdCart />}
                            onClick={() => {
                              const { _id, name, price } = product.productDetails;
                              const img = product.productDetails.productImages[0].img;
                              dispatch(addItemsToCart({ _id, name, price, img }));
                              props.history.push(`/cart`);
                            }}
                            />
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    marginLeft: "5px",
                                }}
                                icon={<AiFillThunderbolt />}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li>
                                <a href="#">Home</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Mobiles</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">{product.productDetails.name.split(' ')[0]}</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">{product.productDetails.name}</a>
                            </li>
                        </ul>
                    </div>
                    {/* product description */}
                    <div className="productDetails">
                        <p className="productTitle">{product.productDetails.name}</p>
                        <div>
                            <span className="ratingCount">
                                {product.productDetails.ratings}.0<IoIosStar />
                            </span>
                            <span className="ratingNumbersReviews">
                                72,234 Ratings & 8,140 Reviews
              </span>
                        </div>
                        <div className="extraOffer">
                            Extra <BiRupee />
              4500 off{" "}
                        </div>
                        <div className="flexRow priceContainer">
                            <span className="price">
                                <BiRupee />
                                {product.productDetails.price}
                            </span>
                            <span className="mrp">
                                <BiRupee />
                                {product.productDetails.mrp}
                            </span>
                            <span className="save">
                                <BiRupee />
                                {product.productDetails.saving}
                            </span>

                            <span className="discount" style={{ margin: "0 10px" }}>
                                {Math.round(product.productDetails.saving / product.productDetails.mrp * 100)}%
              </span>
                            {/* <span>i</span> */}
                        </div>
                        <div>
                            <p
                                style={{
                                    color: "#212121",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Available Offers
              </p>
                            <p style={{ display: "flex" }}>
                                <span
                                    style={{
                                        width: "100px",
                                        fontSize: "12px",
                                        color: "#878787",
                                        fontWeight: "600",
                                        marginRight: "20px",
                                    }}
                                >
                                    Description
                </span>
                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#212121",
                                    }}
                                >
                                    {product.productDetails.description.split(' | ').map((text,index)=>
                                        <li>{text}</li>
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails;
