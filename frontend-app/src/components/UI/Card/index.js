import React from "react";

const Card = (props) => {
  return (
    <div className="card" {...props}>
      {props.headerLeft ||
        (props.headerRight && (
          <div className="cardHeader">
            {/* {console.log(props)} */}
            {props.headerLeft && <div>{props.headerLeft}</div>}
            {props.headerRight && props.headerRight}
          </div>
        ))}
      {props.children}
    </div>
  );
};

export default Card;
// {props.match.params.slug} mobile {priceRange[key] != 500001 ? 'under ' + priceRange[key] : 'above 50000'}
